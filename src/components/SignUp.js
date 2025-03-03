import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'; // Import associated styles

// Sign-Up component
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility

  // Handle input changes
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Check if CTA should be active
  const isSignUpActive = name.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';

  return (
    <div className="signup-screen">
      <Link to="/" className="back-button">
        Back
      </Link>
      <div className="signup-frame">
        <h1 className="signup-title">Sign Up</h1>
        <div className="input-group">
          <label className={`input-label ${name ? 'active' : ''}`} htmlFor="name">
            Name
          </label>
          <div className="input-wrapper">
            <img src={`${process.env.PUBLIC_URL}/profile.png`} alt="Name Icon" className="input-icon" />
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
        <div className="input-group">
          <label className={`input-label ${confirmPassword ? 'active' : ''}`} htmlFor="confirm-password">
            Confirm Password
          </label>
          <div className="input-wrapper">
            <img src={`${process.env.PUBLIC_URL}/lock.png`} alt="Password Icon" className="input-icon" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="input-field"
            />
            <button onClick={toggleConfirmPasswordVisibility} className="visibility-toggle">
              <img
                src={`${process.env.PUBLIC_URL}/${showConfirmPassword ? 'Eye.png' : 'eye-slash.png'}`}
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
          className="signup-cta"
          disabled={!isSignUpActive}
          style={{ backgroundColor: isSignUpActive ? '#572668' : '#ccc' }}
        >
          Sign Up
        </button>
        <p className="signin-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;