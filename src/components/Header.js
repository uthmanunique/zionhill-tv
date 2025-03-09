import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Header.css';

const Header = ({ toggleNav }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="hamburger" onClick={toggleNav}>
          <img
            src={`${process.env.PUBLIC_URL}/hambuger.png`}
            alt="Menu"
            className="hamburger-icon"
          />
        </button>
        <img
          src={`${process.env.PUBLIC_URL}/Zionhilltvlogo.png`}
          alt="Web Logo"
          className="logo"
        />
      </div>
      <div className="header-center">
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <img
              src={`${process.env.PUBLIC_URL}/search-normal.png`}
              alt="Search Icon"
              className="search-icon"
            />
          </button>
        </form>
      </div>
      <div className="header-right">
        {isAuthenticated ? (
          <div className="profile-container">
            <Link to="/profile" className="profile-link">
              <div className="profile-btn">
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="profile-pic"
                  />
                ) : (
                  <span className="profile-moniker">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
            </Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <Link to="/signin" className="signin-link">
            <button className="signin-btn">
              <img
                src={`${process.env.PUBLIC_URL}/profile.png`}
                alt="Sign In Icon"
                className="signin-icon"
              />
              Sign In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;