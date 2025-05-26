import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';
import useTanstackPatch from '../hooks/useTanstackPatch';
import PaginationButtons from '../components/PaginationButtons';
import useTanstackDeleteRequest from '../hooks/useTanstackDeleteRequest';
import parse from 'html-react-parser';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import EditBlogModal from '../components/EditBlogModal';
import useRoleStatus from '../hooks/useRoleStatus';


const ContentManagement = () => {
    const navigate = useNavigate();
    const {userRole}=useRoleStatus()
    const [status, setStatus] = useState('')
    const [itemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: dataCount } = useTanstackGetRequest(`/blogs/count?status=${status}`, 'blogsCount', `${status}`, true)
    const { data: blogsData } = useTanstackGetRequest(`/blogs?status=${status}&page=${currentPage}&limit=${itemsPerPage}`, 'blogs', [status, currentPage, itemsPerPage], true)
    const { mutate: patchMutate } = useTanstackPatch('blogs')
    const { mutate: mutateDelete } = useTanstackDeleteRequest('blogs')
    const [show,setShow] = useState(false)

    // const handleAddBlog = () => {
    //     navigate('/dashboard/content-management/add-blog');
    // };
    const handleStatus = (id, status) => {
        patchMutate({
            url: `/blogs/${id}?status=${status}`,
            data: { status }
        })

    }
    const handleFilter = (blogStatus) => {
        setStatus(blogStatus)
        setCurrentPage(1)
    }
    const handleDelete = (id) => {
        mutateDelete(`/blogs/${id}`)
    }

    return (
        <div className="max-w-6xl mx-auto px-5 dark:bg-black min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold dark:text-white">Content Management 📝</h2>
                <Link to='/dashboard/content-management/add-blog'><button

                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                    Add Blog
                </button></Link>

            </div>

            {/* Optional: add blog list, or CMS content here */}

            <div className="max-w-5xl mx-auto p-5 mt-10 bg-white dark:bg-gray-900 shadow rounded">
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
                    !Array.isArray(blogsData) && <div className="dark:text-white">
                        <p>No blog posts yet. Click "Add Blog" to get started!</p>
                    </div>
                }
                {Array.isArray(blogsData) && (
                    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                        {blogsData.map((blog) => (
                            <div key={blog._id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
                                {blog.thumbnail && (
                                    <img
                                        src={blog.thumbnail}
                                        alt={blog.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}

                                <div className="p-4 space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{blog.title}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(blog.createdAt).toLocaleString()}
                                    </p>

                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        <>
                                            {parse(blog.content.slice(0, 100))}
                                            {blog.content.length > 100 && (
                                                <>
                                                    <span
                                                        data-tooltip-id={`tooltip-${blog._id}`}
                                                        data-tooltip-html={blog.content}
                                                        className="text-blue-600 cursor-pointer underline"
                                                    >
                                                        See more...
                                                    </span>
                                                    <Tooltip
                                                        id={`tooltip-${blog._id}`}
                                                        place="top"
                                                        className="z-50 max-w-xs"
                                                    />
                                                </>
                                            )}
                                        </>
                                    </p>


                                </div>

                                <div className="p-4 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
                                    {
                                        userRole==='admin' && (<div>{blog.status === 'drafted' ? (
                                        <button
                                            onClick={() => handleStatus(blog._id, blog.status)}
                                            className="text-sm px-4 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                                        >
                                            Publish
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleStatus(blog._id, blog.status)}
                                            className="text-sm px-4 py-1 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white"
                                        >
                                            Unpublish
                                        </button>
                                    )}</div>
                                            
                                        )
                                    }
                                    <button
                                        onClick={() => setShow(true)}
                                        className="text-sm px-4 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        Edit
                                    </button>
                                    <EditBlogModal show={show} setShow={setShow} data={blog} url={`blog/${blog._id}`} queryKey={'blogs'} ></EditBlogModal>
                                    {
                                        userRole === 'admin' && (
                                            <button
                                        onClick={() => handleDelete(blog._id)}
                                        className="text-sm px-4 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        Delete
                                    </button>
                                        )
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} dataCount={dataCount}></PaginationButtons>
                
            </div>
        </div>
    );
};

export default ContentManagement;
