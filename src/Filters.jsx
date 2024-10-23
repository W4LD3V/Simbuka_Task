import React from 'react';

const Filters = ({ filterGender, setFilterGender, searchTerm, setSearchTerm }) => {
  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setFilterGender('')}
          className="bg-fuchsia-800 text-white px-4 py-2 rounded hover:bg-fuchsia-950 transition"
        >
          All
        </button>
        <button
          onClick={() => setFilterGender('Male')}
          className="bg-fuchsia-800 text-white px-4 py-2 rounded hover:bg-fuchsia-950 transition"
        >
          Male
        </button>
        <button
          onClick={() => setFilterGender('Female')}
          className="bg-fuchsia-800 text-white px-4 py-2 rounded hover:bg-fuchsia-950 transition"
        >
          Female
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or last name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
    </div>
  );
};

export default Filters;
