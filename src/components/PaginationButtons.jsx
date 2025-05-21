import React, { useEffect, useState } from 'react';


const PaginationButtons = ({setCurrentPage,currentPage,itemsPerPage,dataCount}) => {
    const [totalItems, setTotalItems] = useState(0);
    const numberOfPages = totalItems && Math.ceil(totalItems / itemsPerPage);
    const numberOfButtons = numberOfPages ? [...Array(numberOfPages).keys()] : [];
    
    useEffect(() => {
        if(dataCount){
            setTotalItems(dataCount)
        }
   
      },[dataCount]);

    return (
        <div>
            {/* Pagination */}
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
                        className={`border px-4 py-2 rounded ${currentPage === button + 1 ? 'bg-blue-500 text-white' : ' text-black'
                            }`}
                    >
                        <span className='dark:text-gray-400'>{button + 1}</span>
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
        </div>
    );
};

export default PaginationButtons;