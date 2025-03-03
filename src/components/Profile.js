import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  // Mock data (replace with real user data later)
  const user = { name: "John Doe", email: "john.doe@example.com" };
  const favorites = [
    { id: 1, title: "Ultimate Worship Mix" },
    { id: 2, title: "Sunday Sermon" },
  ];
  const history = [
    { id: 1, title: "Healing Service", date: "2025-03-01" },
    { id: 2, title: "Prayer Night", date: "2025-02-28" },
  ];

  return (
    <div className="profile-screen">
      <Link to="/" className="back-button">Back</Link>
      <div className="profile-frame">
        <h1 className="profile-title">Profile</h1>
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <div className="profile-section">
          <h2>Favorites</h2>
          <ul>
            {favorites.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
        <div className="profile-section">
          <h2>History</h2>
          <ul>
            {history.map((item) => (
              <li key={item.id}>{item.title} - {item.date}</li>
            ))}
          </ul>
        </div>
        <button className="logout-cta">Logout</button>
      </div>
    </div>
  );
};

export default Profile;