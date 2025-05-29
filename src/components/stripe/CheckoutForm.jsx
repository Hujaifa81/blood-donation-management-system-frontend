import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './checkoutForm.css';
import { useAxios } from '../../hooks/useAxios';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';


const CheckoutForm = ({ amount,setAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState('');

  // donation amount in dollars

  // 1. Create payment intent on component load
  useEffect(() => {
    const getPaymentIntent = async () => {
      try {
        if (amount > 0) {
          const { data } = await axiosSecure.post('/create-payment-intent', {
            amount,
          });
          setClientSecret(data.clientSecret);
        }

      } catch (err) {
        console.error('Error creating payment intent:', err);
      }
    };

    getPaymentIntent();
  }, [axiosSecure, clientSecret,amount]);

  // 2. Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (amount <= 0) {
      toast.error('Please enter a valid donation amount.');
      return;
    }
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return;

    // 3. Confirm the payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || 'unknown@example.com',
        },
      },
    });

    if (error) {
      console.error('Payment error:', error);
      toast.error(error.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      
      try {
        await axiosSecure.post('/funding', {
          email: user?.email,
          amount,
          transactionId: paymentIntent.id,
        });
        toast.success('Donation successful!');
        

      } catch (err) {
        console.error('Error saving donation:', err);
        toast.error('Donation saved failed.');
      }
      finally {
        setAmount(0); // Reset amount after successful payment
      }
    }
  };
  console.log('clientSecret:', clientSecret);
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />

      <button type="submit" disabled={!stripe || !clientSecret || !amount} className="btn btn-primary mt-4">
        Pay ${amount}
      </button>
    </form>
  );
};

export default CheckoutForm;
