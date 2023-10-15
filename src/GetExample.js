import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GetExample.css';

// this is the main function for retrieving data based on search search Criteria
// and also the function for deleting data from database

function GetExample() {
  const [data, setData] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchType, setSearchType] = useState('songname');
  const [errors, setErrors] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://127.0.0.1:8000/api/songdetails/`)
      .then((response) => {
        setData(response.data);
        console.log('GET request successful:', response.data);
      })
      .catch((error) => {
        console.error('GET request error:', error);
      });
  };

  const validateInput = () => {
    const newErrors = {};

    if (!searchCriteria.trim()) {
      newErrors.searchCriteria = 'This field is required';
    } else if (
      (searchType === 'id' && isNaN(searchCriteria)) ||
      (searchType === 'artist_name' && !/^[A-Za-z\s]+$/.test(searchCriteria))
    ) {
      newErrors.searchCriteria = 'Invalid input';
    } else if (searchCriteria.length > 100) {
      newErrors.searchCriteria = 'Input is too long';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const filterData = () => {
    if (searchCriteria.trim() === '') {
      return data; // If no search criteria, return all data
    }

    return data.filter((item) => {
      // Perform case-insensitive search
      const searchValue = searchCriteria.toLowerCase();
      const fieldToSearch = item[searchType].toLowerCase();
      return fieldToSearch.includes(searchValue);
    });
  };

  const handleSearch = () => {
    if (validateInput()) {
      axios
        .get(
          `http://127.0.0.1:8000/api/songdetails/?${searchType}=${searchCriteria}`
        )
        .then((response) => {
          setData(response.data);
          setShowWarning(false); // Reset warning
          console.log('Search successful:', response.data);
        })
        .catch((error) => {
          console.error('Search error:', error);
          setData([]); // Clear previous data on error
          setShowWarning(true); // Show warning on error
        });
    }
  };

  const handleRefresh = () => {
    window.location.reload(); // Reload the page
  };

  const renderTable = () => {
    const filteredData = filterData();

    if (filteredData.length === 0) {
      return <p className="no-data-message">No matching data found.</p>;
    }

    const handleDelete = (id) => {
      // Send a DELETE request to the API to delete the data with the given ID
      axios
        .delete(`http://127.0.0.1:8000/api/songdetails/${id}/`)
        .then(() => {
          // After successful deletion, refresh the data
          fetchData();
        })
        .catch((error) => {
          console.error('Delete error:', error);
        });
    };

    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>date added</th>
            <th>album name</th>
            <th>release date</th>
            <th>artist name</th>
            <th>song name</th>
            <th>Action</th> {/* Add a new column for the Delete button */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.date_added}</td>
              <td>{item.album_name}</td>
              <td>{item.release_date}</td>
              <td>{item.artist_name}</td>
              <td>{item.songname}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td> {/* Add the Delete button */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="get-example-container">
      <h2>Retrieve Song Data</h2>

      {/* Search Input and Type Selection */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Criteria"
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          className={errors.searchCriteria ? 'input-error' : ''}
        />
        {errors.searchCriteria && (
          <div className="error-message">{errors.searchCriteria}</div>
        )}
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="songname">Song Name</option>
          <option value="album_name">Album Name</option>
          <option value="artist_name">Artist Name</option>
        </select>
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleRefresh}>Refresh</button> {/* Add the refresh button */}
      </div>

      {showWarning && (
        <div className="warning-message">
          Unable to find data. Please check your input.
        </div>
      )}

      {renderTable()}
    </div>
  );
}

export default GetExample;
