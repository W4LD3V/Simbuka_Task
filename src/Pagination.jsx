import React from 'react';

const Pagination = ({ currentPageNumber, totalPages, goOnPrevPage, goOnNextPage }) => {
  return (
    <div className="flex space-x-4 mt-4 items-center">
      <button
        onClick={goOnPrevPage}
        disabled={currentPageNumber === 0}
        className="bg-fuchsia-800 text-white px-4 py-2 rounded hover:bg-fuchsia-950 disabled:bg-gray-300"
      >
        Prev
      </button>
      <button
        onClick={goOnNextPage}
        disabled={currentPageNumber >= totalPages - 1}
        className="bg-fuchsia-800 text-white px-4 py-2 rounded hover:bg-fuchsia-950 disabled:bg-gray-300"
      >
        Next
      </button>
      <p className="text-gray-700">Page {currentPageNumber + 1} of {totalPages}</p>
    </div>
  );
};

export default Pagination;
