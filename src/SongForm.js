// SongForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './SongForm.css'; // Import your CSS file


// this is the function for taking input from the user about the song details 
// and posting data on to the database

function SongForm() {

  const initialFormData = {
    album_name: '',
    release_date: '',
    artist_name: '',
    songname: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/songdetails/', formData);
      console.log('POST request successful:', response.data);

      // Clear the form fields after successful submission
      setFormData(initialFormData);

    } catch (error) {
      console.error('POST request error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="song-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="album_name">Album Name:</label>
        <input
          type="text"
          id="album_name"
          name="album_name"
          value={formData.album_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="release_date">Release Date:</label>
        <input
          type="date"
          id="release_date"
          name="release_date"
          value={formData.release_date}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="artist_name">Artist Name:</label>
        <input
          type="text"
          id="artist_name"
          name="artist_name"
          value={formData.artist_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="songname">Song Name:</label>
        <input
          type="text"
          id="songname"
          name="songname"
          value={formData.songname}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}

export default SongForm;
