import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Header.css';

const Header = ({ toggleNav }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
    setIsProfileOpen(false);
    logout();
    navigate('/signin');
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Close dropdown when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target.className === 'profile-overlay') {
      setIsProfileOpen(false);
    }
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
            <div className="profile-link" onClick={toggleProfileDropdown}>
              <div className="profile-btn">
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic || `${process.env.PUBLIC_URL}/user2.png`}
                    alt="Profile"
                    className="profile-pic"
                  />
                ) : (
                  <span className="profile-moniker">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
            </div>
            {isProfileOpen && (
              <>
                <div className="profile-overlay" onClick={handleOverlayClick}></div>
                <div className="profile-dropdown">
                  <Link to="/profile" className="profile-header-link" onClick={() => setIsProfileOpen(false)}>
                    <div className="profile-header">
                      <img
                        src={user?.profilePic || `${process.env.PUBLIC_URL}/user2.png`}
                        alt="Profile"
                        className="dropdown-profile-pic"
                      />
                      <span className="dropdown-username">{user?.name || 'User'}</span>
                    </div>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    <img
                      src={`${process.env.PUBLIC_URL}/signout.png`}
                      alt="Sign Out"
                      className="dropdown-icon"
                    />
                    <span>Sign Out</span>
                  </div>
                  <div className="dropdown-item" onClick={() => navigate('/settings')}>
                    <img
                      src={`${process.env.PUBLIC_URL}/settings.png`}
                      alt="Settings"
                      className="dropdown-icon"
                    />
                    <span>Settings</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item" onClick={() => navigate('/help')}>
                    <img
                      src={`${process.env.PUBLIC_URL}/help.png`}
                      alt="Help"
                      className="dropdown-icon"
                    />
                    <span>Help</span>
                  </div>
                </div>
              </>
            )}
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