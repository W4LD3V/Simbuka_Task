import React from 'react';

const Pagination = ({ currentPageNumber, totalPages, goOnPrevPage, goOnNextPage, handleSelectChange }) => {
  return (
    <div className="flex space-x-4 mt-4 items-center">
      <button
        onClick={goOnPrevPage}
        disabled={currentPageNumber === 1}
        className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <button
        onClick={goOnNextPage}
        disabled={currentPageNumber === totalPages}
        className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
      >
        Next
      </button>
      <select
        name="page-number"
        onChange={handleSelectChange}
        value={currentPageNumber}
        className="border border-gray-300 rounded-md p-2"
      >
        {Array.from(Array(totalPages))
          .map((e, i) => i + 1)
          .map((val) => {
            return <option key={val}>{val}</option>;
          })}
      </select>
    </div>
  );
};

export default Pagination;
