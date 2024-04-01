import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";

const ShowDetails = () => {
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShow(response.data);
      } catch (error) {
        setError(error);
      }
    })();
  }, [id]);

  return (
    <>
      {error && <p>Error fetching data: {error.message}</p>}
      <div className="show-detail" style={{ padding: "20px" }}>
        {show?.image?.medium ? (
          <img
            src={show.image?.medium ? show.image?.medium : ""}
            alt={show.name}
            className="show-image"
          />
        ) : (
          ""
        )}

        {show ? (
          <div>
            <h2 style={{ marginTop: 0 }}>{show.name}</h2>
            <p style={{ marginBottom: "20px" }}>{show.summary}</p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => (window.location.href = `/book-ticket/${show.id}`)}
            >
              Book Ticket
            </button>
          </div>
        ) : (
          <Loader/>
        )}
      </div>
    </>
  );
};

export default ShowDetails;
