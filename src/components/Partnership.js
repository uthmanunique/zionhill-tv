import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Partnership.css';

const Partnership = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  const isPartnerActive = name.trim() !== '' && email.trim() !== '' && amount.trim() !== '';

  return (
    <div className="partnership-screen">
      <Link to="/" className="back-button">Back</Link>
      <div className="partnership-frame">
        <h1 className="partnership-title">Become a Partner</h1>
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
          <label className={`input-label ${amount ? 'active' : ''}`} htmlFor="amount">
            Amount
          </label>
          <div className="input-wrapper">
            <img src={`${process.env.PUBLIC_URL}/money-icon.png`} alt="Amount Icon" className="input-icon" />
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="input-field"
            />
          </div>
        </div>
        <button
          className="partner-cta"
          disabled={!isPartnerActive}
          style={{ backgroundColor: isPartnerActive ? '#572668' : '#ccc' }}
        >
          Become a Partner
        </button>
      </div>
    </div>
  );
};

export default Partnership;