// MovieBookingForm.js

import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";


function MovieBookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    showName: ''
  });
  const [error, setError] = useState(null);
  const { showId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/shows/${showId}`
        );
        setFormData(prevFormData => ({
          ...prevFormData,
          showName: response.data.name
        }));
      } catch (error) {
        setError(error);
      }
    })();
  }, [showId]);

  const { name, email, showName } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission
    localStorage.setItem('movieFormData', JSON.stringify(formData));
    // Optionally, you can clear the form fields after submission
    setFormData({
      name: '',
      email: '',
      showName: showName
    });
  };

  return (
    <div className="movie-booking-form">
      <h2>Movie Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={handleChange} />
        </div>
        <div>
          <label>Show Name:</label>
          <input type="text" name="showName" value={showName} readOnly />
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default MovieBookingForm;
