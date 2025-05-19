import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';
import { useForm } from 'react-hook-form';
import UpazilaDistrict from '../api/useUpazilaDistrict';
import useTanstackPut from '../hooks/useTanstackPut';

const UpdateRequest = () => {
    const { id } = useParams()
    const { mutate } = useTanstackPut('donationRequests')
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm();
    const { data, isLoading } = useTanstackGetRequest(`/donationRequest/${id}`, 'donationRequests', id, true)
    const { upazilas, districts } = UpazilaDistrict()
    const navigate=useNavigate()
    
    const onSubmit =async (data) => {
       await mutate({
            url: `/donationRequests/${id}`,
            data: data
        })
        navigate('/dashboard')
    }

    return (
        <div className="max-w-2xl mx-auto p-5 dark:bg-black">
            <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Update Donation Request</h2>
            {
                data && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Recipient Info */}
                        <div>
                            <label className="block font-medium dark:text-white">Recipient Name</label>
                            <input
                                type="text"
                                defaultValue={data.recipientName}
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
                                defaultValue={data?.recipientDistrict}
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
                                defaultValue={data?.recipientUpazila}
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
                                defaultValue={data.hospitalName}
                            />
                            {errors.hospitalName && <p className="text-red-500">{errors.hospitalName.message}</p>}
                        </div>

                        <div>
                            <label className="block font-medium dark:text-white">Full Address Line</label>
                            <input
                                type="text"
                                {...register('fullAddress', { required: 'Full address is required' })}
                                className="w-full border p-2 rounded dark:bg-gray-900"
                                defaultValue={data.fullAddress}
                            />
                            {errors.fullAddress && <p className="text-red-500">{errors.fullAddress.message}</p>}
                        </div>

                        <div>
                            <label className="block font-medium dark:text-white">Blood Group</label>
                            <select
                                {...register('bloodGroup', { required: 'Blood group is required' })}
                                className="w-full border p-2 rounded dark:bg-gray-900"
                                defaultValue={data.bloodGroup}
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
                                defaultValue={data.donationDate}
                            />
                            {errors.donationDate && <p className="text-red-500">{errors.donationDate.message}</p>}
                        </div>

                        <div>
                            <label className="block font-medium dark:text-white">Donation Time</label>
                            <input
                                type="time"
                                {...register('donationTime', { required: 'Donation time is required' })}
                                className="w-full border p-2 rounded dark:bg-gray-900"
                                defaultValue={data.donationTime}
                            />
                            {errors.donationTime && <p className="text-red-500">{errors.donationTime.message}</p>}
                        </div>



                        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full">
                            Update Request
                        </button>
                    </form>
                )
            }
        </div>
    );
};

export default UpdateRequest;