import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);

  const isResetActive = email.trim() !== '';

  return (
    <div className="forgot-password-screen">
      <Link to="/" className="back-button">Back</Link>
      <div className="forgot-password-frame">
        <h1 className="forgot-password-title">Forgot Password</h1>
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
        <button
          className="reset-cta"
          disabled={!isResetActive}
          style={{ backgroundColor: isResetActive ? '#572668' : '#ccc' }}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;