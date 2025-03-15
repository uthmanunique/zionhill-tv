import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { userStore } from '../userStore';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import api from '../api';
import './Profile.css';

const Profile = () => {
  const { updateUser } = useAuth();
  const [user, setUser] = useState(null); // Start as null, populated by subscription
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  useEffect(() => {
    const unsubscribe = userStore.subscribe((newUser) => {
      console.log('Profile: User updated', newUser);
      setUser(newUser);
      setEditName(newUser?.name || '');
      setEditEmail(newUser?.email || '');
    });
    if (userStore.isAuthenticated() && !userStore.getUser()) {
      userStore.initialize();
    }
    return () => unsubscribe();
  }, []);

  const handleEditOpen = () => {
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/auth/profile', { name: editName, email: editEmail });
      const updatedUser = { ...userStore.getUser(), ...data.user }; // Merge with current user
      updateUser(updatedUser);
      setIsEditOpen(false);
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Edit profile error:', err);
      if (err.response?.status === 401) {
        navigate('/signin');
      } else {
        alert('Failed to update profile: ' + (err.response?.data?.message || 'Unknown error'));
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match');
      return;
    }
    try {
      await api.post('/auth/change-password', { currentPassword, newPassword });
      setIsPasswordOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Password changed successfully');
    } catch (err) {
      console.error('Change password error:', err);
      alert('Failed to change password');
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePic', file);
      try {
        const { data } = await api.post('/auth/upload-pic', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const updatedUser = { ...userStore.getUser(), profilePic: `http://localhost:5000${data.profilePic}` };
        updateUser(updatedUser);
        alert('Profile picture updated successfully');
      } catch (err) {
        console.error('Profile pic upload error:', err);
        alert('Failed to upload profile picture');
      }
    }
  };

  const handleEditIconClick = () => fileInputRef.current.click();

  const handleLogout = () => {
    userStore.logout();
    navigate('/signin');
  };

  const favorites = [
    { id: 1, title: 'Ultimate Worship Mix', thumbnail: `${process.env.PUBLIC_URL}/thumb1.jpg` },
    { id: 2, title: 'Sunday Sermon', thumbnail: `${process.env.PUBLIC_URL}/thumb2.jpg` },
  ];
  const history = [
    { id: 1, title: 'Healing Service', date: '2025-03-01', thumbnail: `${process.env.PUBLIC_URL}/thumb3.jpg` },
    { id: 2, title: 'Prayer Night', date: '2025-02-28', thumbnail: `${process.env.PUBLIC_URL}/thumb4.jpg` },
  ];

  const renderTabContent = () => {
    if (!user) return <div>Loading...</div>;
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            <p><strong>Favorites:</strong> {favorites.length} items</p>
            <p><strong>Watch History:</strong> {history.length} items</p>
          </div>
        );
      case 'favorites':
        return (
          <div className="tab-content grid">
            {favorites.map((item) => (
              <div key={item.id} className="grid-item">
                <img src={item.thumbnail} alt={item.title} className="thumbnail" />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        );
      case 'history':
        return (
          <div className="tab-content grid">
            {history.map((item) => (
              <div key={item.id} className="grid-item">
                <img src={item.thumbnail} alt={item.title} className="thumbnail" />
                <span>{item.title} - {item.date}</span>
              </div>
            ))}
          </div>
        );
      case 'settings':
        return (
          <div className="tab-content">
            <button className="settings-btn" onClick={handleEditOpen}>Edit Profile</button>
            <button className="settings-btn" onClick={() => setIsPasswordOpen(true)}>Change Password</button>
            <button className="settings-btn logout" onClick={handleLogout}>Logout</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-screen">
      <Header toggleNav={toggleNav} />
      <Navigation isOpen={isNavOpen} />
      <main className="profile2-content">
        {user && (
          <>
            <div className="profile2-header">
              <div className="profile-pic-container">
                <img
                  src={user.profilePic || `${process.env.PUBLIC_URL}/profile-pic-placeholder.jpg`}
                  alt="Profile"
                  className="profile-pic"
                  onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/profile-pic-placeholder.jpg`)}
                />
                <img
                  src={`${process.env.PUBLIC_URL}/pencil.png`}
                  alt="Edit Profile Pic"
                  className="edit-profile-pic-icon"
                  onClick={handleEditIconClick}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleProfilePicChange}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="profile-info">
                <h1 className="profile-name">{user.name}</h1>
                <p className="profile-email">{user.email}</p>
              </div>
            </div>
            <div className="profile-body">
              <div className="profile-tabs">
                <button
                  className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
                  onClick={() => setActiveTab('favorites')}
                >
                  Favorites
                </button>
                <button
                  className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveTab('history')}
                >
                  History
                </button>
                <button
                  className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  Settings
                </button>
              </div>
              <div className="tab-container">{renderTabContent()}</div>
            </div>
          </>
        )}
      </main>

      {isEditOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Profile</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="input-group">
                <label htmlFor="edit-name">Name</label>
                <input
                  type="text"
                  id="edit-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label htmlFor="edit-email">Email</label>
                <input
                  type="email"
                  id="edit-email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="modal-btn">Save</button>
                <button type="button" className="modal-btn cancel" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isPasswordOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="input-group">
                <label htmlFor="current-password">Current Password</label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label htmlFor="new-password">New Password</label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirm-password">Confirm New Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="modal-btn">Change</button>
                <button type="button" className="modal-btn cancel" onClick={() => setIsPasswordOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;