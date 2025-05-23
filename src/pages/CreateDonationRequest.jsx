import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import UpazilaDistrict from '../api/useUpazilaDistrict';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import useAxiosSecure from '../hooks/useAxiosSecure';
import { data } from 'react-router-dom';
import useRoleStatus from '../hooks/useRoleStatus';

const CreateDonationRequest = () => {
    const { user } = useAuth();
    const {userStatus}=useRoleStatus()
    const { upazilas, districts } = UpazilaDistrict();
    const axiosPrivate=useAxiosSecure()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();
    const queryClient =  useQueryClient();
    useEffect(() => {
        if (user) {
            setValue('name', user.displayName || '');
            setValue('email', user.email || '');
            
        }
    }, [user, setValue]);
    const onSubmit = async (data) => {
        const requestedData = {
            ...data 
        }
        await mutate(requestedData);
        
    }
    const { mutate, isPending, isSuccess, isError, error } = useMutation({
        mutationFn: (data)=> {
            const res=axiosPrivate.post(`/donationRequests/${user?.email}`, {
                // requesterName:user?.displayName,
                // requesterEmail:user?.email,
                ...data

            })
            return res.data
        },
        onSuccess: (data) => {
            toast.success('Request submitted successfully!');
            queryClient.invalidateQueries(['donationRequests']);
            reset({
                name: user?.displayName || '',
                email: user?.email || '',
                
            }); 
          },
          onError: (error) => {
            toast.error(`Error: ${error.message}`);
          }
      });
    //   console.log(data);
    return (
        <>
        {
             userStatus === 'active'?(<div className="max-w-2xl mx-auto px-5 dark:bg-black">
            <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Create Donation Request</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Requester Info */}
                <div>
                    <label className="block font-medium dark:text-white">Requester Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        readOnly
                        className="w-full border p-2 rounded dark:bg-gray-900"
                    />
                </div>
                <div>
                    <label className="block font-medium dark:text-white">Requester Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full border p-2 rounded dark:bg-gray-900"
                    />
                </div>

                {/* Recipient Info */}
                <div>
                    <label className="block font-medium dark:text-white">Recipient Name</label>
                    <input
                        type="text"
                        {...register('recipientName', { required: 'Recipient name is required' })}
                        className="w-full border p-2 rounded dark:bg-gray-900"
                    />
                    {errors.recipientName && <p className="text-red-500">{errors.recipientName.message}</p>}
                </div>

                <div>
                    <label className="block font-medium dark:text-white">Recipient District</label>
                    <select
                        {...register('recipientDistrict', { required: 'District is required' })}
                        className="w-full border p-2 rounded dark:bg-gray-900"
                    >
                        <option value="">Select District</option>
                        {districts?.map((d) => (
                            <option key={d.id} value={d.name}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                    {errors.recipientDistrict && <p className="text-red-500">{errors.recipientDistrict.message}</p>}
                </div>

                <div>
                    <label className="block font-medium dark:text-white">Recipient Upazila</label>
                    <select
                        {...register('recipientUpazila', { required: 'Upazila is required' })}
                        className="w-full border p-2 rounded dark:bg-gray-900"
                    >
                        <option value="">Select Upazila</option>
                        {upazilas?.map((u) => (
                            <option key={u.id} value={u.name}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                    {errors.recipientUpazila && <p className="text-red-500">{errors.recipientUpazila.message}</p>}
                </div>

                <div>
                    <label className="block font-medium dark:text-white">Hospital Name</label>
                    <input
                        type="text"
                        {...register('hospitalName', { required: 'Hospital name is required' })}
                        className="w-full border p-2 rounded dark:bg-gray-900"
                    />
                    {errors.hospitalName && <p className="text-red-500">{errors.hospitalName.message}</p>}
                </div>

                <div>
                    <label className="block font-medium dark:text-white">Full Address Line</label>
                    <input
                        type="text"
                        {...register('fullAddress', { required: 'Full address is required' })}
                        className="w-full border p-2 rounded dark:bg-gray-900"
                    />
                    {errors.fullAddress && <p className="text-red-500">{errors.fullAddress.message}</p>}
                </div>

                <div>
                    <label className="block font-medium dark:text-white">Blood Group</label>
                    <select
                        {...register('bloodGroup', { required: 'Blood group is required' })}
                        className="w-full border p-2 rounded dark:bg-gray-900"
                    >
                        <option value="">Select Blood Group</option>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                            <option key={bg} value={bg}>
                                {bg}
                            </option>
                        ))}
                    </select>
                    {errors.bloodGroup && <p className="text-red-500">{errors.bloodGroup.message}</p>}
                </div>

                <div>
                    <label className="block font-medium dark:text-white">Donation Date</label>
                    <input
                        type="date"
                        {...register('donationDate', { required: 'Donation date is required' })}
                        className="w-full border p-2 rounded dark:bg-gray-900"
                    />
                    {errors.donationDate && <p className="text-red-500">{errors.donationDate.message}</p>}
                </div>

                <div>
                    <label className="block font-medium dark:text-white">Donation Time</label>
                    <input
                        type="time"
                        {...register('donationTime', { required: 'Donation time is required' })}
                        className="w-full border p-2 rounded dark:bg-gray-900"
                    />
                    {errors.donationTime && <p className="text-red-500">{errors.donationTime.message}</p>}
                </div>

                <div>
                    <label className="block font-medium dark:text-white">Request Message</label>
                    <textarea
                        rows={4}
                        {...register('requestMessage', { required: 'Request message is required' })}
                        className="w-full border p-2 rounded dark:bg-gray-900"
                    />
                    {errors.requestMessage && <p className="text-red-500">{errors.requestMessage.message}</p>}
                </div>

                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full">
                    Submit Request
                </button>
            </form>
        </div>):(<p>Your status is blocked.So you can not create a request </p>)
        }
        </>
        
        

    );
};

export default CreateDonationRequest;