import React from 'react';
import { useParams } from 'react-router-dom';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';
import parse from 'html-react-parser';

const BlogDetails = () => {
  const { id } = useParams();

  const { data: blog, isLoading } = useTanstackGetRequest(
    `/blogs/${id}`,
    'blogDetails',
    id,
    false
  );

  if (isLoading || !blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-5 mt-10 bg-white dark:bg-gray-900 rounded shadow">
      <div className="mb-6">
        <h1 className="text-3xl font-bold dark:text-white mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Published on: {new Date(blog.createdAt).toLocaleString()}
        </p>
      </div>

      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}

      <div className="text-gray-700 dark:text-gray-200 leading-7">
        {parse(blog.content)}
      </div>
    </div>
  );
};

export default BlogDetails;
