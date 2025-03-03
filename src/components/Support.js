import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Support.css';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const isSubmitActive = name.trim() !== '' && email.trim() !== '' && message.trim() !== '';

  return (
    <div className="support-screen">
      <Link to="/" className="back-button">Back</Link>
      <div className="support-frame">
        <h1 className="support-title">Contact Support</h1>
        <div className="input-group">
          <label className={`input-label ${name ? 'active' : ''}`} htmlFor="name">
            Name
          </label>
          <div className="input-wrapper">
            <img src={`${process.env.PUBLIC_URL}/name-icon.png`} alt="Name Icon" className="input-icon" />
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="input-field"
            />
          </div>
        </div>
        <div className="input-group">
          <label className={`input-label ${email ? 'active' : ''}`} htmlFor="email">
            Email
          </label>
          <div className="input-wrapper">
            <img src={`${process.env.PUBLIC_URL}/email-icon.png`} alt="Email Icon" className="input-icon" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="input-field"
            />
          </div>
        </div>
        <div className="input-group">
          <label className={`input-label ${message ? 'active' : ''}`} htmlFor="message">
            Message
          </label>
          <div className="input-wrapper">
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              className="textarea-field"
            />
          </div>
        </div>
        <button
          className="submit-cta"
          disabled={!isSubmitActive}
          style={{ backgroundColor: isSubmitActive ? '#572668' : '#ccc' }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Support;