import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';
import { useForm } from 'react-hook-form';
import useUpazilaDistrict from '../api/useUpazilaDistrict';
import { imageUpload } from '../api/imagebb';
import useTanstackPut from '../hooks/useTanstackPut';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const { user,updateUserProfile } = useAuth()
    const { mutate, isPending } = useTanstackPut('user')
    const navigate = useNavigate()
    const { data: userResult } = useTanstackGetRequest(`/user/${user?.email}`, 'user', `${user?.email}`, true) // ✅ fixed template string
    const { upazilas, districts } = useUpazilaDistrict()
    const [notEdit, setNotEdit] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loading,setLoading]=useState(false)
    const onSubmit = async (data) => {
        setNotEdit(!notEdit);

        if (!notEdit) {
            const file = data.photo[0];
            const { photo, ...rest } = data; 
           
            if (file) {

                setLoading(true)
                const photoURL = await imageUpload(file);
                
                if (photoURL) {
                    mutate({
                        url: `/user/${user.email}`,
                        data: {
                            ...rest,
                            image: photoURL
                        }
                    });
                    await updateUserProfile(data.name, photoURL)
                    setLoading(false)
                }
            }
            else {
                setLoading(true)
                await mutate({
                    url: `/user/${user.email}`,
                    data: {
                        ...rest,
                        image: userResult.image
                    }
                });
                await updateUserProfile(data.name, data.image)
                
                setLoading(false)
            }
        }
    };


    return (
        <div className="max-w-xl mx-auto p-5 dark:bg-black">
            <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Profile</h2>
            {
                loading?'loading.............':userResult && (
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block font-medium dark:text-white">Name</label>
                                <input type="text" readOnly={notEdit} defaultValue={userResult.name} className="w-full border p-2 rounded dark:bg-gray-900"
                                    {...register("name", {
                                        required: "Name is required",
                                    })} />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block font-medium dark:text-white">Email</label>
                                <input type="text" defaultValue={userResult.email} readOnly className="w-full border p-2 rounded dark:bg-gray-900"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                    })} />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label className="block font-medium dark:text-white">Blood Group</label>
                                <select disabled={notEdit} defaultValue={userResult.bloodGroup} className="w-full border p-2 rounded dark:bg-gray-900"
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
                                <select disabled={notEdit} defaultValue={userResult.district} className="w-full border p-2 rounded dark:bg-gray-900"
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
                                <select disabled={notEdit} defaultValue={userResult.upazila} className="w-full border p-2 rounded dark:bg-gray-900"
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
                                <img src={userResult?.image} alt="" />
                            </div>
                            {
                                notEdit || (<div>
                                    <label className="block font-medium dark:text-white">Photo</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full border p-2 rounded dark:bg-gray-900"
                                        {...register("photo", {
                                            // required: "Photo is required",
                                        })}
                                    />
                                    {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
                                </div>)
                            }

                            <button
                                type="submit"
                                className="bg-red-600 text-white px-4 py-2 rounded w-full"
                            >
                                {notEdit ? (isPending ? 'saving' : 'edit') :'save' }
                            </button>

                        </form>
                    </div>
                )
                
            }
        </div>
    );
};
