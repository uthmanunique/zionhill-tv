// src/components/RecentMessages.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // Ensure this is your axios instance
import './RecentMessages.css';

const RecentMessages = ({ navOpen }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await api.get('/api/recent-messages');
        setMessages(data.slice(0, 8)); // Limit to 8 items
      } catch (err) {
        console.error('Fetch recent messages error:', err);
      }
    };
    fetchMessages();
  }, []);

  return (
    <section className="recent-messages">
      <div className="section-header">
        <h2 className="messages-title">Recently Added Messages</h2>
        <Link to="/recent-messages" className="see-all-link">
          See All
          <img
            src={`${process.env.PUBLIC_URL}/arrowright.png`}
            alt="Arrow Right"
            className="see-all-arrow"
          />
        </Link>
      </div>
      <div className={`messages-container ${navOpen ? 'nav-open' : ''}`}>
        <div className="messages-row">
          {messages.slice(0, Math.ceil(messages.length / 2)).map((message) => (
            <Link to={`/video/${message._id}`} key={message._id} className="message-frame">
              <div
                className="message-image"
                style={{ backgroundImage: `url(${message.image})` }}
              />
              <p className="message-title">{message.title}</p>
            </Link>
          ))}
        </div>
        <div className="messages-row">
          {messages.slice(Math.ceil(messages.length / 2)).map((message) => (
            <Link to={`/video/${message._id}`} key={message._id} className="message-frame">
              <div
                className="message-image"
                style={{ backgroundImage: `url(${message.image})` }}
              />
              <p className="message-title">{message.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentMessages;