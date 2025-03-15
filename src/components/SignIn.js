import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import api from '../api';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/signin', { email, password });
      login(data.token);
      localStorage.setItem('token', data.token); // Ensure token is stored
      navigate('/profile');
      setError(''); // Clear error on success
    } catch (err) {
      console.error('Signin error:', err);
      setError(err.response?.data?.message || 'Sign in failed');
    }
  };

  const isSignInActive = email.trim() !== '' && password.trim() !== '';

  return (
    <div className="signin-screen">
      <Link to="/" className="back-button">Back</Link>
      <div className="signin-frame">
        <h1 className="signin-title">Sign In</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignIn}> {/* Use handleSignIn */}
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
            className="signin-cta"
            disabled={!isSignInActive}
            style={{ backgroundColor: isSignInActive ? '#572668' : '#ccc' }}
          >
            Sign In
          </button>
        </form>
        <div className="signin-footer">
          <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
          <p>
            Don’t have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;