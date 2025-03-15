// src/components/Sport.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './Sports.css';

const Sport = ({ navOpen }) => {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const { data } = await api.get('/api/sport');
        setSports(data.slice(0, 7)); // Limit to 7 items
      } catch (err) {
        console.error('Fetch sport error:', err);
      }
    };
    fetchSports();
  }, []);

  return (
    <section className="sport">
      <div className="section-header">
        <h2 className="sport-title">Sports</h2>
        <Link to="/sport" className="see-all-link">
          See All
          <img
            src={`${process.env.PUBLIC_URL}/arrow-right.png`}
            alt="Arrow Right"
            className="see-all-arrow"
          />
        </Link>
      </div>
      <div className={`sport-container ${navOpen ? 'nav-open' : ''}`}>
        <div className="sport-row">
          {sports.slice(0, Math.ceil(sports.length / 2)).map((sport) => (
            <Link to={`/video/${sport._id}`} key={sport._id} className="sport-frame">
              <div
                className="sport-image"
                style={{ backgroundImage: `url(${sport.image})` }}
              />
              <p className="sport-title">{sport.title}</p>
            </Link>
          ))}
        </div>
        <div className="sport-row">
          {sports.slice(Math.ceil(sports.length / 2)).map((sport) => (
            <Link to={`/video/${sport._id}`} key={sport._id} className="sport-frame">
              <div
                className="sport-image"
                style={{ backgroundImage: `url(${sport.image})` }}
              />
              <p className="sport-title">{sport.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sport;