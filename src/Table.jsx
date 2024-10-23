import React from 'react';

const Table = ({ dataToDisplay, sortData, sortColumn, sortOrder, openDialog }) => {
  return (
    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th
            onClick={() => sortData('firstName')}
            className="cursor-pointer px-4 py-2 text-gray-600"
          >
            First name {sortColumn === 'firstName' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
          </th>
          <th
            onClick={() => sortData('lastName')}
            className="cursor-pointer px-4 py-2 text-gray-600"
          >
            Last name {sortColumn === 'lastName' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
          </th>
          <th className="px-4 py-2 text-gray-600">Information</th>
        </tr>
      </thead>
      <tbody>
        {dataToDisplay.map((item) => (
          <tr key={item.id} className="border-t border-gray-200">
            <td className="px-4 py-2">{item.firstName}</td>
            <td className="px-4 py-2">{item.lastName}</td>
            <td className="px-4 py-2">
              <button onClick={() => openDialog(item)} className="text-blue-500 hover:underline">
                More Information
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
