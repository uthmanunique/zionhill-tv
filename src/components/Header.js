import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ensure this doesn’t pull in Profile.js
import { userStore } from '../userStore';
import './Header.css';

const Header = ({ toggleNav }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(userStore.getUser());
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const unsubscribe = userStore.subscribe((newUser) => {
      console.log('Header: User updated', newUser);
      setUser(newUser ? { ...newUser } : null);
    });
    if (isAuthenticated() && !user) {
      userStore.initialize();
    }
    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    navigate('/signin');
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'profile-overlay') {
      setIsProfileOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="hamburger" onClick={toggleNav}>
          <img src={`${process.env.PUBLIC_URL}/hambuger.png`} alt="Menu" className="hamburger-icon" />
        </button>
        <img src={`${process.env.PUBLIC_URL}/Zionhilltvlogo.png`} alt="Web Logo" className="logo" />
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
            <img src={`${process.env.PUBLIC_URL}/search-normal.png`} alt="Search Icon" className="search-icon" />
          </button>
        </form>
      </div>
      <div className="header-right">
        {isAuthenticated() && user ? (
          <div className="profile-container">
            <div className="profile-link" onClick={toggleProfileDropdown}>
              <div className="profile-btn">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="profile-pic"
                    onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/user2.png`)}
                  />
                ) : (
                  <span className="profile-moniker">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
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
                          src={user.profilePic || `${process.env.PUBLIC_URL}/user2.png`}
                          alt="Profile"
                          className="dropdown-profile-pic"
                          onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/user2.png`)}
                        />
                        <div className="dropdown-info">
                          <span className="dropdown-username">{user.name || 'User'}</span>
                          {/* Removed: <span className="dropdown-joined">Joined: {new Date(user.createdAt).toLocaleDateString()}</span> */}
                        </div>
                      </div>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item" onClick={handleLogout}>
                      <img src={`${process.env.PUBLIC_URL}/signout.png`} alt="Sign Out" className="dropdown-icon" />
                      <span>Sign Out</span>
                    </div>
                  <div className="dropdown-item" onClick={() => navigate('/settings')}>
                    <img src={`${process.env.PUBLIC_URL}/settings.png`} alt="Settings" className="dropdown-icon" />
                    <span>Settings</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item" onClick={() => navigate('/help')}>
                    <img src={`${process.env.PUBLIC_URL}/help.png`} alt="Help" className="dropdown-icon" />
                    <span>Help</span>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link to="/signin" className="signin-link">
            <button className="signin-btn">
              <img src={`${process.env.PUBLIC_URL}/profile.png`} alt="Sign In Icon" className="signin-icon" />
              Sign In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;