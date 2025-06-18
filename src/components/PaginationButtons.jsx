import React, { useEffect, useState } from 'react';

const PaginationButtons = ({ setCurrentPage, currentPage, itemsPerPage, dataCount }) => {
  const [totalItems, setTotalItems] = useState(0);
  console.log(currentPage, itemsPerPage, dataCount);
  useEffect(() => {
    if (dataCount !== undefined && dataCount !== null) {
      setTotalItems(dataCount);
    }
  }, [dataCount]);

  // Ensure at least 1 page exists
  const numberOfPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const numberOfButtons = [...Array(numberOfPages).keys()];

  return (
    <div className="mt-4 space-x-2 flex justify-center items-center">
      <button
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="border px-4 py-2 rounded dark:text-gray-400"
      >
        Previous
      </button>

      {numberOfButtons.map((button) => (
        <button
          key={button}
          onClick={() => setCurrentPage(button + 1)}
          className={`border px-4 py-2 rounded ${
            currentPage === button + 1 ? 'bg-blue-500 text-white' : 'text-black dark:text-gray-400'
          }`}
        >
          {button + 1}
        </button>
      ))}

      <button
        onClick={() => currentPage < numberOfPages && setCurrentPage(currentPage + 1)}
        disabled={currentPage === numberOfPages}
        className="border px-4 py-2 rounded dark:text-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
