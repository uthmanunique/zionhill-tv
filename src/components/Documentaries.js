// src/components/Documentaries.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // Ensure this is your axios instance
import './Documentaries.css';

const Documentaries = ({ navOpen }) => {
  const [documentaries, setDocumentaries] = useState([]);

  useEffect(() => {
    const fetchDocumentaries = async () => {
      try {
        const { data } = await api.get('/api/documentaries');
        setDocumentaries(data.slice(0, 8)); // Limit to 8 items
      } catch (err) {
        console.error('Fetch recent documentaries error:', err);
      }
    };
    fetchDocumentaries();
  }, []);

  return (
    <section className="documentaries">
      <div className="section-header">
        <h2 className="documentaries-title">Documentaries</h2>
        <Link to="/documentaries" className="see-all-link">
          See All
          <img
            src={`${process.env.PUBLIC_URL}/arrowright.png`}
            alt="Arrow Right"
            className="see-all-arrow"
          />
        </Link>
      </div>
      <div className={`documentaries-container ${navOpen ? 'nav-open' : ''}`}>
        <div className="documentaries-row">
          {documentaries.slice(0, Math.ceil(documentaries.length / 2)).map((documentaries) => (
            <Link to={`/video/${documentaries._id}`} key={documentaries._id} className="documentaries-frame">
              <div
                className="documentaries-image"
                style={{ backgroundImage: `url(${documentaries.image})` }}
              />
              <p className="documentaries-title">{documentaries.title}</p>
            </Link>
          ))}
        </div>
        <div className="documentaries-row">
          {documentaries.slice(Math.ceil(documentaries.length / 2)).map((doumentaries) => (
            <Link to={`/video/${documentaries._id}`} key={documentaries._id} className="documentaries-frame">
              <div
                className="documentaries-image"
                style={{ backgroundImage: `url(${documentaries.image})` }}
              />
              <p className="documentaries-title">{documentaries.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Documentaries;