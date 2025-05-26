import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useTanstackPatch from '../hooks/useTanstackPatch';
import useAuth from '../hooks/useAuth';

const DonateModal = ({ show, setShow, id, status }) => {
    const { user } = useAuth()
    const { mutate } = useTanstackPatch('donationRequests');


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const url = `/donationRequests/${id}`;
            const donorData = {
                status:status,
                donorInfo: {
                    donorName: user?.displayName,
                    donorEmail: user?.email,
                },
            };

            await mutate({
                url: url,
                data: donorData,
            });


            setShow(false);
            document.getElementById('my_modal_1')?.close();
        } catch (err) {
            toast.error(err.message || 'Something went wrong');
        }
    };

    if (show) {
        document.getElementById('my_modal_1')?.showModal();
    }

    return (
        <div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block font-medium dark:text-white">Donor Name</label>
                            <input
                                type="text"
                                defaultValue={user?.displayName}
                                {...register('name')}
                                className="w-full border p-2 rounded dark:bg-gray-900"
                                readOnly
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block font-medium dark:text-white">Donor Email</label>
                            <input
                                type="text"
                                defaultValue={user?.email}
                                {...register('email')}
                                className="w-full border p-2 rounded dark:bg-gray-900"
                                readOnly
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Submit and Close buttons together */}
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShow(false);
                                    document.getElementById('my_modal_1')?.close();
                                }}
                                className="btn"
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default DonateModal;
