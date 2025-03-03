import React, { useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import './ZMC.css';

const ZMC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  // Mock ZMC video data (12 items)
  const zmcVideos = [
    { id: 1, title: "Choir Praise 1", image: `${process.env.PUBLIC_URL}/zmc-video1.png` },
    { id: 2, title: "Choir Worship 2", image: `${process.env.PUBLIC_URL}/zmc-video2.png` },
    { id: 3, title: "Choir Anthem 3", image: `${process.env.PUBLIC_URL}/zmc-video3.png` },
    { id: 4, title: "Choir Special 4", image: `${process.env.PUBLIC_URL}/zmc-video4.png` },
    { id: 5, title: "Choir Praise 5", image: `${process.env.PUBLIC_URL}/zmc-video5.png` },
    { id: 6, title: "Choir Worship 6", image: `${process.env.PUBLIC_URL}/zmc-video6.png` },
    { id: 7, title: "Choir Anthem 7", image: `${process.env.PUBLIC_URL}/zmc-video7.png` },
    { id: 8, title: "Choir Special 8", image: `${process.env.PUBLIC_URL}/zmc-video8.png` },
    { id: 9, title: "Choir Praise 9", image: `${process.env.PUBLIC_URL}/zmc-video9.png` },
    { id: 10, title: "Choir Worship 10", image: `${process.env.PUBLIC_URL}/zmc-video10.png` },
    { id: 11, title: "Choir Anthem 11", image: `${process.env.PUBLIC_URL}/zmc-video11.png` },
    { id: 12, title: "Choir Special 12", image: `${process.env.PUBLIC_URL}/zmc-video12.png` },
  ];

  // Inline style for faded logo background
  const headerFrameStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/Zionhilltvlogo.png)`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.1, // Faint effect
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
          <div style={headerFrameStyle}></div> {/* Faded logo */}
          <h1 className="zmc-header-title">ZMC (Zion Music Choir)</h1>
        </div>
        <section className="zmc-videos-section">
          <div className="zmc-videos-grid">
            {zmcVideos.map((video) => (
              <div key={video.id} className="zmc-video-item">
                <div
                  className="zmc-video-image"
                  style={{ backgroundImage: `url(${video.image})` }}
                />
                <p className="zmc-video-title">{video.title}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ZMC;