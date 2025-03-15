// src/components/Music.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './Music.css';

const Music = ({ navOpen }) => {
  const [music, setMusic] = useState([]);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const { data } = await api.get('/api/music');
        setMusic(data.slice(0, 7));
      } catch (err) {
        console.error('Fetch music error:', err);
      }
    };
    fetchMusic();
  }, []);

  return (
    <section className="music">
      <div className="section-header">
        <h2 className="music-title">Music</h2>
        <Link to="/music" className="see-all-link">
          See All
          <img
            src={`${process.env.PUBLIC_URL}/arrow-right.png`}
            alt="Arrow Right"
            className="see-all-arrow"
          />
        </Link>
      </div>
      <div className={`music-container ${navOpen ? 'nav-open' : ''}`}>
        <div className="music-row">
          {music.slice(0, Math.ceil(music.length / 2)).map((item) => (
            <Link to={`/video/${item._id}`} key={item._id} className="music-frame">
              <div
                className="music-image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <p className="music-title">{item.title}</p>
            </Link>
          ))}
        </div>
        <div className="music-row">
          {music.slice(Math.ceil(music.length / 2)).map((item) => (
            <Link to={`/video/${item._id}`} key={item._id} className="music-frame">
              <div
                className="music-image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <p className="music-title">{item.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Music;