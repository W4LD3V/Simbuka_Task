import React, { useState, useEffect } from 'react';
import { fetchData } from './services/api';
import Filters from './Filters';
import Table from './Table';
import Pagination from './Pagination';
import Dialog from './Dialog';
import Login from './Login';

const App = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterGender, setFilterGender] = useState('');
  const [sortColumn, setSortColumn] = useState('firstName');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const TOTAL_VALUES_PER_PAGE = 3;
  const [selectedRow, setSelectedRow] = useState(null);
  const dialogRef = React.createRef();
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Loading the data using a helper function only when auth token is available
  useEffect(() => {
    if (token) {
      const loadData = async () => {
        const result = await fetchData();
        if (result) {
          setData(result);
        }
      };

      loadData();
    }
  }, [token]);

  // Table records sorting logic
  const sortData = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortColumn(column);

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return newSortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return newSortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  // Filtering logic for gender and search input
  const filteredData = data.filter((item) => {
    const matchesGender = filterGender === '' || item.gender === filterGender;
    const matchesSearch =
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesGender && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / TOTAL_VALUES_PER_PAGE);

  // Pagination logic
  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    const updatedData = filteredData.slice(start, end);
  
    if (JSON.stringify(updatedData) !== JSON.stringify(dataToDisplay)) {
      setDataToDisplay(updatedData);
    }
  }, [currentPageNumber, filteredData]);

  const goOnPrevPage = () => {
    if (currentPageNumber > 1) setCurrentPageNumber(currentPageNumber - 1);
  };

  const goOnNextPage = () => {
    if (currentPageNumber < totalPages) setCurrentPageNumber(currentPageNumber + 1);
  };

  const handleSelectChange = (e) => setCurrentPageNumber(Number(e.target.value));

  // Dialog box handling
  const openDialog = (row) => {
    setSelectedRow(row);
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setSelectedRow(null);
  };

  // Login redirect if no token
  if (!token) {
    return <Login setToken={setToken} />;
  }

  // Loading screen
  if (data.length === 0) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Filters
        filterGender={filterGender}
        setFilterGender={setFilterGender}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Table
        dataToDisplay={dataToDisplay}
        sortData={sortData}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        openDialog={openDialog}
      />

      <Pagination
        currentPageNumber={currentPageNumber}
        totalPages={totalPages}
        goOnPrevPage={goOnPrevPage}
        goOnNextPage={goOnNextPage}
        handleSelectChange={handleSelectChange}
      />

      <Dialog selectedRow={selectedRow} dialogRef={dialogRef} closeDialog={closeDialog} />
    </div>
  );
};

export default App;
