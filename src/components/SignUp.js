import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios'; // Added axios
import './SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Added for error handling
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      login(res.data.user); // Log in with returned user data
      localStorage.setItem('token', res.data.token); // Store JWT
      navigate('/'); // Redirect to home
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed'); // Display error
    }
  };

  const isSignUpActive = name.trim() !== '' && email.trim() !== '' && password.trim() !== '';

  return (
    <div className="signup-screen">
      <Link to="/" className="back-button">Back</Link>
      <div className="signup-frame">
        <h1 className="signup-title">Sign Up</h1>
        {error && <p className="error-message">{error}</p>} {/* Error display */}
        <form onSubmit={handleSubmit}>
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
              <img src={`${process.env.PUBLIC_URL}/lock.png`} alt="Lock Icon" className="input-icon" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="input-field"
              />
            </div>
          </div>
          <button
            type="submit"
            className="signup-cta"
            disabled={!isSignUpActive}
            style={{ backgroundColor: isSignUpActive ? '#572668' : '#ccc' }}
          >
            Sign Up
          </button>
        </form>
        <div className="signup-footer">
          <p>
            Already have an account? <Link to="/signin" className="signin-link">Sign In</Link>
          </p>
          <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;