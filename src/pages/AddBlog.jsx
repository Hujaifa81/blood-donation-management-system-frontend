import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { imageUpload } from '../api/imagebb';
import useTanstackPost from '../hooks/useTanstackPost';
import toast from 'react-hot-toast';
import Editor from '../components/Editor';


const AddBlog = () => {
   const [content, setContent] = useState('');
    const { mutate } = useTanstackPost('blogs')
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const onSubmit = async (data) => {
        try {

            const photoURL = await imageUpload(data.thumbnail[0])
            if (!photoURL) {
                alert('Image upload failed.');
                return;
            }
            if (!content) {
                toast.error('your content box is empty.')
                return
            }
            const blogData = {
                title: data.title,
                content,
                thumbnail: photoURL,
                createdAt: new Date()
            };
            await mutate({
                url: `/blogs`,
                data: blogData
            })
            reset()
            setContent('')
        }
        catch (err) {
            toast.error(err)
        }
    }
    
    return (
        <div>
            <div className="max-w-3xl mx-auto px-6 bg-white rounded shadow ">
                <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="block font-medium dark:text-white">Title</label>
                        <input
                            type="text"
                            {...register('title', { required: 'Title name is required' })}
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
                            {...register("thumbnail", {
                                required: "Thumbnail is required",
                            })}
                        />
                        {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message}</p>}
                    </div>
                    <div>
                        <label className="block font-semibold">Content</label>
                        <Editor content={content} setContent={setContent}></Editor>

                    </div>
                    <button
                        type="submit"
                        // disabled={isSubmitting}
                        className="bg-blue-600 text-white px-4 py-2 mb-4 rounded hover:bg-blue-700"
                    >
                        {/* {isSubmitting ? 'Creating...' : 'Create'} */}
                        Create
                    </button>
                </form>
            </div>
            
           
        </div>
    );
};

export default AddBlog;