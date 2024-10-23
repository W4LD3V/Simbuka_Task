import React, { useState, useEffect } from 'react';
import { fetchAllData } from './services/api';
import Filters from './Filters';
import Table from './Table';
import Pagination from './Pagination';
import Dialog from './Dialog';
import Login from './Login';

const CACHE_DURATION = 600000;
const CACHE_KEY = 'employeeData';
const CACHE_EXPIRATION_KEY = 'employeeDataExpiration';

const App = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('firstName');
  const dialogRef = React.createRef();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [totalPages, setTotalPages] = useState(1);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  // BROWSER STORAGE LOGIC
  const isCacheValid = () => {
    const expiration = localStorage.getItem(CACHE_EXPIRATION_KEY);
    return expiration && new Date().getTime() < Number(expiration);
  };

  // API FETCHING LOGIC
  const loadData = async () => {
    if (isCacheValid()) {
      const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
      setAllData(cachedData);
      setFilteredData(cachedData);
    } else {
      const result = await fetchAllData();
      if (result) {
        setAllData(result);
        setFilteredData(result);
        localStorage.setItem(CACHE_KEY, JSON.stringify(result));
        localStorage.setItem(
          CACHE_EXPIRATION_KEY,
          (new Date().getTime() + CACHE_DURATION).toString()
        );
      }
    }
  };

  // AUTHENTICATION
  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  // SORTING LOGIC
  const handleSort = (column) => {
    if (sortColumn === column) {
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newSortOrder);
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  // FILTER AND SORTING
  useEffect(() => {
    let filtered = allData;

    if (filterGender) {
      filtered = filtered.filter((item) => item.gender === filterGender);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const sortedData = [...filtered].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
    setCurrentPage(0);
  }, [filterGender, searchTerm, allData, sortColumn, sortOrder]);

  const paginatedData = filteredData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const totalPagesCalculated = Math.ceil(filteredData.length / pageSize);

  useEffect(() => {
    setTotalPages(totalPagesCalculated);
  }, [totalPagesCalculated]);

  const goOnPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goOnNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handleSelectChange = (e) => setPageSize(Number(e.target.value));

  const openDialog = (row) => {
    setSelectedRow(row);
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setSelectedRow(null);
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // DARK MODE
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const theme = !darkMode ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', !darkMode);
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  if (allData.length === 0) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-900 dark:text-white p-8`}>
      <div className="flex justify-between mb-4">
        <button onClick={toggleDarkMode} className="bg-fuchsia-800 text-white px-4 py-2 rounded hover:bg-fuchsia-950 transition">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      <Filters
        filterGender={filterGender}
        setFilterGender={setFilterGender}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <label htmlFor="pageSize" className="mr-2">Records per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <Table
        dataToDisplay={paginatedData}
        sortData={handleSort}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        openDialog={openDialog}
      />

      <Pagination
        currentPageNumber={currentPage}
        totalPages={totalPages}
        goOnPrevPage={goOnPrevPage}
        goOnNextPage={goOnNextPage}
      />

      <Dialog selectedRow={selectedRow} dialogRef={dialogRef} closeDialog={closeDialog} />
    </div>
  );
};

export default App;