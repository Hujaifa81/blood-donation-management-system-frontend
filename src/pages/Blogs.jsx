import React, { useState } from 'react';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';
import parse from 'html-react-parser';
import PaginationButtons from '../components/PaginationButtons';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [itemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: dataCount } = useTanstackGetRequest(
    `/blogs/count?status=published`,
    'blogsCount',
    [],
    false
  );

  const { data: blogsData } = useTanstackGetRequest(
    `/blogs?status=published&page=${currentPage}&limit=${itemsPerPage}`,
    'blogs',
    [currentPage, itemsPerPage],
    false
  );

  return (
    <div className="max-w-6xl mx-auto p-5 mt-10 bg-white dark:bg-gray-900 shadow rounded">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Latest Blogs</h2>

      {!Array.isArray(blogsData) || blogsData.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No blog posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogsData.map((blog) => (
            <div
              key={blog._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {blog.thumbnail && (
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {new Date(blog.createdAt).toLocaleString()}
                  </p>
                  <div className="text-sm text-gray-700 dark:text-gray-200 line-clamp-4 mb-2">
                    {parse(blog.content.slice(0, 150))}
                  </div>
                </div>

                <div className="mt-auto pt-2">
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <PaginationButtons
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        dataCount={dataCount}
      />
    </div>
  );
};

export default Blogs;
