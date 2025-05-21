import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { imageUpload } from '../api/imagebb';
import useTanstackPost from '../hooks/useTanstackPost';
import toast from 'react-hot-toast';
import Editor from '../components/Editor';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';
import useTanstackPatch from '../hooks/useTanstackPatch';
import PaginationButtons from '../components/PaginationButtons';

const AddBlog = () => {
    const [status,setStatus]=useState('')
    const [itemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [content, setContent] = useState('');
    const {data:dataCount}=useTanstackGetRequest(`/blogs/count?status=${status}`,'blogsCount',`${status}`,true)
    const { data: blogs } = useTanstackGetRequest(`/blogs?status=${status}&page=${currentPage}&limit=${itemsPerPage}`, 'blogs', [status,currentPage,itemsPerPage], true)
    const {mutate:patchMutate}=useTanstackPatch('blogs')
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
    const handleStatus=(id,status)=>{
        patchMutate({
            url:`/blogs/${id}?status=${status}`,
            data:{status}
        })

    }
    const handleFilter=(blogStatus)=>{
        setStatus(blogStatus)
        setCurrentPage(1)
    }
    return (
        <div>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
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
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {/* {isSubmitting ? 'Creating...' : 'Create'} */}
                        Create
                    </button>
                </form>
            </div>
            {/* Drafts */}
            <div className="max-w-5xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 shadow rounded">
                <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Drafts</h1>
                <select
                defaultValue=""
                onChange={(e) => handleFilter(e.target.value)}
                className="select mb-4"
            >
                <option value="">All</option>
                <option value="drafted">Draft</option>
                <option value="published">Publish</option>

            </select>
                {
                    Array.isArray(blogs) && (<div className="space-y-4">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="border p-4 rounded dark:bg-gray-800">
                                <h2 className="text-xl font-semibold dark:text-white">{blog.title}</h2>
                                {blog.thumbnail && (
                                    <img src={blog.thumbnail} alt="thumbnail" className="w-32 mt-2 rounded" />
                                )}
                                <div

                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                ></div>

                                <p className="text-sm text-gray-500 mt-1">
                                    Saved at: {new Date(blog.createdAt).toLocaleString()}
                                </p>
                                <div>
                                    {
                                        blog.status === 'drafted' && <button onClick={()=>handleStatus(blog._id,blog.status)}>Publish</button>
                                    }

                                    {
                                        blog.status === 'published' && <button onClick={()=>handleStatus(blog._id,blog.status)}>Unpublish</button>
                                    }

                                </div>
                            </div>
                        ))}
                    </div>)
                }
                <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} dataCount={dataCount}></PaginationButtons>
            </div>
        </div>
    );
};

export default AddBlog;