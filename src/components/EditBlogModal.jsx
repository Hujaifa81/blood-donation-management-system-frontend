import React, { useState } from 'react';
import useTanstackPut from '../hooks/useTanstackPut';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { imageUpload } from '../api/imagebb';
import Editor from './Editor';

const EditBlogModal = ({ show, setShow, data: blog, url, queryKey }) => {
    const { mutate } = useTanstackPut(queryKey);
    const [content, setContent] = useState(blog?.content || '');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            let photoURL = blog?.thumbnail;
            if (data.thumbnail[0]) {
                photoURL = await imageUpload(data.thumbnail[0]);
                if (!photoURL) {
                    alert('Image upload failed.');
                    return;
                }
            }

            if (!content) {
                toast.error('Your content box is empty.');
                return;
            }

            const blogData = {
                title: data.title,
                content,
                thumbnail: photoURL,
                createdAt: new Date(),
            };

            await mutate({
                url: url,
                data: blogData,
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
                            <label className="block font-medium dark:text-white">Title</label>
                            <input
                                type="text"
                                defaultValue={blog?.title}
                                {...register('title', { required: 'Title is required' })}
                                className="w-full border p-2 rounded dark:bg-gray-900"
                                placeholder="Enter blog title"
                            />
                            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className="block font-medium dark:text-white">Thumbnail</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full border p-2 rounded dark:bg-gray-900"
                                {...register('thumbnail')}
                            />
                            {errors.thumbnail && (
                                <p className="text-red-500">{errors.thumbnail.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold">Content</label>
                            <Editor content={content} setContent={setContent} />
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

export default EditBlogModal;
