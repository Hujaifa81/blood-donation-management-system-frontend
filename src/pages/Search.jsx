import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAxios } from '../hooks/useAxios';
import UpazilaDistrict from '../api/useUpazilaDistrict';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';

const Search = () => {
    const axiosPublic = useAxios();
    const { upazilas, districts } = UpazilaDistrict();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [bloodGroup, setBloodGroup] = useState('');
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [search, setSearch] = useState(false);

    const { data } = useTanstackGetRequest(
  `/donors/search?bloodGroup=${encodeURIComponent(bloodGroup)}&district=${encodeURIComponent(district)}&upazila=${encodeURIComponent(upazila)}&search=${search}`,
  'searchResults',
  [bloodGroup, district, upazila, search],
  true
);



    const onSubmit = async (data) => {
        try {
            setBloodGroup(data.bloodGroup);
            setDistrict(data.district);
            setUpazila(data.upazila);
            setSearch(true);
            console.log(data)
        } catch (err) {
            toast.error(err.message);
        }

    };

    return (
        <div className="max-w-4xl mx-auto p-5 dark:bg-black min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">🔍 Search Blood Donors</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-4 mb-8">
                {/* Blood Group */}
                <div>
                    <select
                        className="select select-bordered w-full dark:bg-gray-800 dark:text-white"
                        defaultValue=""
                        {...register("bloodGroup", { required: "Blood Group is required" })}
                    >
                        <option disabled value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option> 
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>

                    {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup.message}</p>}
                </div>

                {/* District */}
                <div>
                    <select
                        className="select select-bordered w-full dark:bg-gray-800 dark:text-white"
                        defaultValue=""
                        {...register("district", { required: "District is required" })}
                    >
                        <option disabled value="">Select District</option>
                        {districts?.map(d => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                    </select>
                    {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                </div>

                {/* Upazila */}
                <div>
                    <select
                        className="select select-bordered w-full dark:bg-gray-800 dark:text-white"
                        defaultValue=""
                        {...register("upazila", { required: "Upazila is required" })}
                    >
                        <option disabled value="">Select Upazila</option>
                        {upazilas?.map(u => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                    </select>
                    {errors.upazila && <p className="text-red-500 text-sm mt-1">{errors.upazila.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="md:col-span-3">
                    <button type="submit" className="btn w-full bg-red-600 hover:bg-red-700 text-white">
                        Search Donors
                    </button>
                </div>
            </form>

            {/* Donor Results */}
            <div className="mt-10">
                {Array.isArray(data) && data.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {data.map((donor) => (
                            <div key={donor._id} className="card bg-white dark:bg-gray-900 border rounded-lg shadow hover:shadow-md transition-all">
                                <div className="card-body flex items-center gap-4">
                                    <img
                                        src={donor.image || 'https://i.ibb.co/vjm5qQn/default-avatar.png'}
                                        alt="avatar"
                                        className="w-20 h-20 object-cover rounded-full border"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold dark:text-white">{donor.name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{donor.email}</p>
                                        <p className="text-sm mt-2"><span className="font-semibold">Blood Group:</span> <span className="badge badge-outline text-red-600">{donor.bloodGroup}</span></p>
                                        <p className="text-sm"><span className="font-semibold">Location:</span> {donor.district}, {donor.upazila}</p>
                                        <p className="text-sm"><span className="font-semibold">Status:</span> <span className={`badge ${donor.status === 'active' ? 'badge-success' : 'badge-ghost'}`}>{donor.status}</span></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    search && (
                        <div className="text-center mt-8">
                            <p className="text-gray-600 dark:text-gray-400">No donors found based on your search.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Search;
