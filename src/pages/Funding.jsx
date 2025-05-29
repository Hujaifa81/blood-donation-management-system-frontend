import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/stripe/CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const Funding = () => {
  const [amount, setAmount] = useState(0)
  const handleAmount = (value) => {
    if (value < 0 || isNaN(value)) {
      setAmount(0);
    } else {
      setAmount(value);
    }
  };
  return (
    <div className="min-h-screen ">
      <div className='space-x-2 mt-2 text-sm'>
        <label htmlFor='quantity' className=' text-gray-600'>
          Amount of donation:
        </label>
        <input
          value={amount}
          
          onChange={e => handleAmount(parseFloat(e.target.value))}
          className=' p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
          name='amount'
          id='amount'
          type='number'
          placeholder='Enter amount'
          required
        />
      </div>
      <Elements stripe={stripePromise} >
        <CheckoutForm amount={amount} setAmount={setAmount} />
      </Elements>
    </div>
  );
};


export default Funding;