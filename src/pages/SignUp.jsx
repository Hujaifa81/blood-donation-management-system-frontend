import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { useAxios } from '../hooks/useAxios';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { imageUpload } from '../api/imagebb';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import UpazilaDistrict from '../api/UpazilaDistrict';

const SignUp = () => {
    const { emailRegister, updateUserProfile } = useAuth()
    const axiosPublic = useAxios()
    const axiosPrivate = useAxiosSecure()
    const navigate = useNavigate()
    const {upazilas, districts} = UpazilaDistrict()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    
    const onSubmit = async (data) => {
        const photoURL = await imageUpload(data.photo[0])

        try {
            await emailRegister(data.email, data.password)
            await updateUserProfile(data.name, photoURL)

            await axiosPublic.post(`/users/${data.email}`, {
                email: data.email,
                name: data.name,
                image: photoURL,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upazila: data.upazila,

            })
            await axiosPrivate.post(`/jwt`, { email: data.email });
            toast.success('User created successfully')
            navigate('/')
        }
        catch (err) {
            toast.error('User already exists')
        }
    }

    return (
        <div className="max-w-xl mx-auto p-5 dark:bg-black">
            <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-medium dark:text-white">Name</label>
                    <input type="text" className="w-full border p-2 rounded dark:bg-gray-900"
                        {...register("name", {
                            required: "Name is required",
                        })} />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="block font-medium dark:text-white">Email</label>
                    <input type="text" className="w-full border p-2 rounded dark:bg-gray-900"
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                        })} />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block font-medium dark:text-white">Password</label>
                    <input type="password" className="w-full border p-2 rounded dark:bg-gray-900"
                        {...register("password", {
                            required: "Password is required",
                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, message: "Password must contain at least 6 characters, including uppercase and lowercase letters" }
                        })} />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div>
                    <label className="block font-medium dark:text-white">Confirm Password</label>
                    <input type="password" className="w-full border p-2 rounded dark:bg-gray-900"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) => value === watch('password') || "Passwords do not match"
                        })} />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                </div>
                <div>
                    <label className="block font-medium dark:text-white">Blood Group</label>
                    <select className="w-full border p-2 rounded dark:bg-gray-900"
                        {...register("bloodGroup", {
                            required: "Blood Group is required",
                        })}>
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                    {errors.bloodGroup && <p className="text-red-500">{errors.bloodGroup.message}</p>}
                </div>
                <div>
                    <label className="block font-medium dark:text-white">Districts</label>
                    <select className="w-full border p-2 rounded dark:bg-gray-900"
                        {...register("district", {
                            required: "District is required",
                        })}>
                        <option value="">Select District</option>
                        {
                            districts?.map(district => <option key={district.id} value={district.name}>{district.name}</option>)
                        }
                    </select>
                    {errors.district && <p className="text-red-500">{errors.district.message}</p>}
                </div>
                <div>
                    <label className="block font-medium dark:text-white">Upazila</label>
                    <select className="w-full border p-2 rounded dark:bg-gray-900"
                        {...register("upazila", {
                            required: "Upazila is required",
                        })}>
                        <option value="">Select Upazila</option>
                        {
                            upazilas?.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                        }
                    </select>
                    {errors.upazila && <p className="text-red-500">{errors.upazila.message}</p>}
                </div>
                <div>
                    <label className="block font-medium dark:text-white">Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full border p-2 rounded dark:bg-gray-900"
                        {...register("photo", {
                            required: "Photo is required",
                        })}
                    />
                    {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
                </div>


                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full">Sign Up</button>
                <p className='dark:text-white'>Already have an account?<span className='text-red-600'><Link to='/sign-in'> Sign in</Link></span></p>
            </form>
        </div>
    );
};

export default SignUp;