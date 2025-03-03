import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css'; // Import associated styles

// Sign-In component
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  // Handle input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Check if CTA should be active
  const isSignInActive = email.trim() !== '' && password.trim() !== '';

  return (
    <div className="signin-screen">
      <Link to="/" className="back-button">
        Back
      </Link>
      <div className="signin-frame">
        <h1 className="signin-title">Sign In</h1>
        <div className="input-group">
          <label className={`input-label ${email ? 'active' : ''}`} htmlFor="email">
            Email
          </label>
          <div className="input-wrapper">
            <img src={`${process.env.PUBLIC_URL}/sms.png`} alt="Email Icon" className="input-icon" />
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
          <label className={`input-label ${password ? 'active' : ''}`} htmlFor="password">
            Password
          </label>
          <div className="input-wrapper">
            <img src={`${process.env.PUBLIC_URL}/lock.png`} alt="Password Icon" className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="input-field"
            />
            <button onClick={togglePasswordVisibility} className="visibility-toggle">
              <img
                src={`${process.env.PUBLIC_URL}/${showPassword ? 'Eye.png' : 'eye-slash.png'}`}
                alt="Toggle Visibility"
                className="visibility-icon"
              />
            </button>
          </div>
        </div>
        <div className="forgot-password">
          <Link to="#">Forgot Password?</Link>
        </div>
        <button
          className="signin-cta"
          disabled={!isSignInActive}
          style={{ backgroundColor: isSignInActive ? '#572668' : '#ccc' }}
        >
          Sign In
        </button>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;