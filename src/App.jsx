import React, { useState, useEffect } from 'react';
import { fetchData } from './services/api';

const App = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterGender, setFilterGender] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const TOTAL_VALUES_PER_PAGE = 3;

  const [selectedRow, setSelectedRow] = useState(null);
  const dialogRef = React.createRef();

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData();
      if (result) {
        setData(result);
        setSortColumn('firstName');
      }
    };

    loadData();
  }, []);

  
  const sortData = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortColumn(column);

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) {
        return newSortOrder === 'asc' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return newSortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };


  const filteredData = data.filter((item) => {
    const matchesGender = filterGender === '' || item.gender === filterGender;
    const matchesSearch =
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesGender && matchesSearch;
  });

  const goOnPrevPage = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1);
    }
  };

  const goOnNextPage = () => {
    const totalPages = Math.ceil(filteredData.length / TOTAL_VALUES_PER_PAGE);
    if (currentPageNumber < totalPages) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };

  const handleSelectChange = (e) => {
    setCurrentPageNumber(Number(e.target.value));
  };

  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setDataToDisplay(filteredData.slice(start, end));
  }, [currentPageNumber, filteredData]);

  const openDialog = (row) => {
    setSelectedRow(row);
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setSelectedRow(null);
  };

  if (data.length === 0) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setFilterGender('')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          All
        </button>
        <button
          onClick={() => setFilterGender('Male')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Male
        </button>
        <button
          onClick={() => setFilterGender('Female')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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
                <button
                  onClick={() => openDialog(item)}
                  className="text-blue-500 hover:underline"
                >
                  More Information
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
          disabled={currentPageNumber === Math.ceil(filteredData.length / TOTAL_VALUES_PER_PAGE)}
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
          {Array.from(Array(Math.ceil(filteredData.length / TOTAL_VALUES_PER_PAGE)))
            .map((e, i) => i + 1)
            .map((val) => {
              return <option key={val}>{val}</option>;
            })}
        </select>
      </div>

      <dialog ref={dialogRef} className="p-6 bg-white rounded-lg shadow-lg">
        {selectedRow && (
          <div>
            <button
              onClick={closeDialog}
              className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Close
            </button>
            <ul className="list-disc pl-5">
              <li><strong>Customer ID:</strong> {selectedRow.customerIdentificationCode}</li>
              <li><strong>First Name:</strong> {selectedRow.firstName}</li>
              <li><strong>Last Name:</strong> {selectedRow.lastName}</li>
              <li><strong>Birth Date:</strong> {selectedRow.birthDate}</li>
              <li><strong>Gender:</strong> {selectedRow.gender}</li>
            </ul>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default App;
