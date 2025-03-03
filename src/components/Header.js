import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

// Header component with responsive hamburger menu
const Header = ({ toggleNav }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Mock authentication state (replace with real auth later)
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulate logged-in state
  const [user, setUser] = useState(null); // Mock user data

  // Simulate sign-in/sign-up (for testing, toggle this manually or via SignIn/SignUp)
  const handleSignInToggle = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      setUser(null); // Logout
    } else {
      setIsAuthenticated(true);
      setUser({ name: "John Doe", profilePic: `${process.env.PUBLIC_URL}/user3.png` }); // Mock user
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
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
          <Link to="/profile" className="profile-link">
            <div className="profile-btn">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="profile-pic"
                />
              ) : (
                <span className="profile-moniker">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </Link>
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
        {/* Temporary toggle button for testing */}
        <button onClick={handleSignInToggle} className="toggle-auth">
          Toggle Auth (Test)
        </button>
      </div>
    </header>
  );
};

export default Header;