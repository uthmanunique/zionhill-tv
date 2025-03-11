import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import axios from 'axios';
import { useAuth } from './AuthContext';
import Header from './Header';
import Navigation from './Navigation';
import './ZMC.css';

const ZMC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/videos', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setVideos(res.data))
      .catch((err) => console.error('Fetch videos error:', err));
  }, [isAuthenticated, navigate]);

  // Inline style for faded logo background
  const headerFrameStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/Zionhilltvlogo.png)`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  return (
    <div className="zmc-screen">
      <Header toggleNav={toggleNav} />
      <Navigation isOpen={isNavOpen} />
      <main className={`zmc-content ${isNavOpen ? 'nav-open' : ''}`}>
        <div className="zmc-header-frame">
          <div style={headerFrameStyle}></div>
          <h1 className="zmc-header-title">ZMC (Zion Music Choir)</h1>
        </div>
        <section className="zmc-videos-section">
          <div className="zmc-videos-grid">
            {videos.length > 0 ? (
              videos.map((video) => (
                <Link
                  key={video._id}
                  to={`/video-preview/${video._id}`} // Link to VideoPreview with video ID
                  className="zmc-video-item"
                >
                  <div
                    className="zmc-video-image"
                    style={{ backgroundImage: `url(${video.image})` }}
                  />
                  <p className="zmc-video-title">{video.title}</p>
                </Link>
              ))
            ) : (
              <p>No videos available</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ZMC;