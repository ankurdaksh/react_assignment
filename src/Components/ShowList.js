import React, { useState, useEffect } from "react";
import DefaultImage from "../assets/default.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        setShows(response.data);
      } catch (error) {
        setError(error);
      }
    })();
  }, []);
  return (
    <><h1 style={{ textAlign: 'center' }}>TV SHOWS</h1>
     {error && <p>Error fetching data: {error.message}</p>}
    <div className="show-list">
     
      
      {shows?.map(({ show }) => (
        <div key={show.id} className="show-card">
          <div className="show-image-container">
            <img
              src={show?.image?.medium ? show.image?.medium : DefaultImage}
              alt={show.name}
              className="show-image"
            />
          </div>
          <div className="show-details">
            <h2 className="show-name">{show.name}</h2>
            <p>Language: {show.language}</p>
            <p>Genres: {show.genres.join(", ")}</p>
            <Link to={`/show/${show.id}`} className="show-details-link">
              Show Details
            </Link>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default ShowList;
