import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // No Link needed here
import './Navigation.css'; // Import associated styles
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'; // Import social media icons

// Navigation panel component
const Navigation = ({ isOpen }) => {
  const [activeItem, setActiveItem] = useState(null); // Track active menu item
  const navigate = useNavigate(); // For programmatic navigation

  // Handle menu item click with scrolling or routing
  const handleItemClick = (item, sectionId, route) => {
    setActiveItem(item);
    if (sectionId) {
      // Scroll to section on Home page
      navigate('/'); // Ensure we’re on Home
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure navigation completes
    } else if (route) {
      // Navigate to a separate route
      navigate(route);
    }
  };

  return (
    <nav className={`navigation ${isOpen ? 'open' : ''}`}>
      {/* Main menu items */}
      <ul className="nav-menu">
        <li
          className={`nav-item ${activeItem === 'home' ? 'active' : ''}`}
          onClick={() => handleItemClick('home', 'hero-section')}
        >
          <img src={`${process.env.PUBLIC_URL}/house.png`} alt="Home Icon" className="nav-icon" />
          <span>Home</span>
        </li>
        <li
          className={`nav-item ${activeItem === 'reels' ? 'active' : ''}`}
          onClick={() => handleItemClick('reels', 'reelz-section')}
        >
          <img src={`${process.env.PUBLIC_URL}/reel.png`} alt="Reels Icon" className="nav-icon" />
          <span>Reels</span>
        </li>
        <li
          className={`nav-item ${activeItem === 'live' ? 'active' : ''}`}
          onClick={() => handleItemClick('live', null, '/live/1')}
        >
          <img src={`${process.env.PUBLIC_URL}/live.png`} alt="Live Icon" className="nav-icon" />
          <span>Live</span>
        </li>
        <li
          className={`nav-item ${activeItem === 'zmc' ? 'active' : ''}`}
          onClick={() => handleItemClick('zmc', null, '/zmc')}
        >
          <img src={`${process.env.PUBLIC_URL}/zmc.png`} alt="ZMC Icon" className="nav-icon" />
          <span>ZMC</span>
        </li>
        <li
          className={`nav-item ${activeItem === 'history' ? 'active' : ''}`}
          onClick={() => handleItemClick('history', 'history-section')}
        >
          <img src={`${process.env.PUBLIC_URL}/history.png`} alt="History Icon" className="nav-icon" />
          <span>History</span>
        </li>
        <li
          className={`nav-item ${activeItem === 'favourites' ? 'active' : ''}`}
          onClick={() => handleItemClick('favourites', 'favourites-section')}
        >
          <img src={`${process.env.PUBLIC_URL}/favourites.png`} alt="Favourites Icon" className="nav-icon" />
          <span>Favourites</span>
        </li>
        <li
          className={`nav-item ${activeItem === 'partnership' ? 'active' : ''}`}
          onClick={() => handleItemClick('partnership', null, '/partnership')}
        >
          <img src={`${process.env.PUBLIC_URL}/partnership-icon.png`} alt="Partnership Icon" className="nav-icon" />
          <span>Partnership</span>
        </li>
        <li
          className={`nav-item ${activeItem === 'connect' ? 'active' : ''}`}
          onClick={() => handleItemClick('Connect', null, '/support')}
        >
          <img src={`${process.env.PUBLIC_URL}/support-icon.png`} alt="Support Icon" className="nav-icon" />
          <span>Connect</span>
        </li>
      </ul>

      {/* Footer section */}
      <div className="nav-footer">
        <ul className="footer-links">
          <li><button className="footer-btn" onClick={() => navigate('/contact')}>Contact</button></li>
          <li><button className="footer-btn" onClick={() => navigate('/settings')}>Settings</button></li>
        </ul>
        <ul className="footer-links horizontal">
          <li><button className="footer-btn terms-privacy-help">Terms</button></li>
          <li><button className="footer-btn terms-privacy-help">Privacy</button></li>
          <li><button className="footer-btn terms-privacy-help">Help</button></li>
        </ul>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="social-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="social-icon" />
          </a>
        </div>
        <p className="copyright">© 2025 Zionhill TV. All rights reserved</p>
      </div>
    </nav>
  );
};

export default Navigation;