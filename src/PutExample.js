// PutExample.js

import React, { useState } from 'react';
import axios from 'axios';
import './PutExample.css'; // Import your CSS file

// This is the function for updating data which is already present in the database
// we update the data using its ID

function PutExample() {
  const initialFormData = {
    album_name: '',
    release_date: '',
    artist_name: '',
    songname: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [id, setId] = useState(''); // State for the ID input

  const handlePutData = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/songdetails/${id}/`,
        formData
      );
      console.log('PUT request successful:', response.data);

      // Clear the form fields after successful update
      setFormData(initialFormData);
      setId(''); // Clear the ID input as well

    } catch (error) {
      console.error('PUT request error:', error);
    }
  };

  return (
    <div className="put-example-container">
      <h2>Update Song Data</h2>

      {/* ID input */}
      <div className="input-group">
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>

      {/* Form fields for updating data */}
      <div className="input-group">
        <label htmlFor="album_name">Album Name:</label>
        <input
          type="text"
          id="album_name"
          name="album_name"
          value={formData.album_name}
          onChange={(e) =>
            setFormData({ ...formData, album_name: e.target.value })
          }
        />
      </div>
      <div className="input-group">
        <label htmlFor="release_date">Release Date:</label>
        <input
          type="date"
          id="release_date"
          name="release_date"
          value={formData.release_date}
          onChange={(e) =>
            setFormData({ ...formData, release_date: e.target.value })
          }
        />
      </div>
      <div className="input-group">
        <label htmlFor="artist_name">Artist Name:</label>
        <input
          type="text"
          id="artist_name"
          name="artist_name"
          value={formData.artist_name}
          onChange={(e) =>
            setFormData({ ...formData, artist_name: e.target.value })
          }
        />
      </div>
      <div className="input-group">
        <label htmlFor="songname">Song Name:</label>
        <input
          type="text"
          id="songname"
          name="songname"
          value={formData.songname}
          onChange={(e) =>
            setFormData({ ...formData, songname: e.target.value })
          }
        />
      </div>
      <button className="submit-button" onClick={handlePutData}>
        update
      </button>
    </div>
  );
}

export default PutExample;
