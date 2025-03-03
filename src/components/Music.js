import React from 'react';
import { Link } from 'react-router-dom'; // Add this import
import './RecentMessages.css'; // Import associated styles

// Recent Messages section component
const Music = ({ navOpen }) => {
  // Mock data for recent messages (replace with dynamic data later)
  const messageData = [
    { id: 1, title: "Sunday Sermon | Grace and Truth", image: `${process.env.PUBLIC_URL}/message1.png` },
    { id: 2, title: "Midweek Teaching | Faith Foundations", image: `${process.env.PUBLIC_URL}/message2.png` },
    { id: 3, title: "Special Event | Healing Service", image: `${process.env.PUBLIC_URL}/message3.png` },
    { id: 4, title: "Guest Speaker | Hope Renewed", image: `${process.env.PUBLIC_URL}/message4.png` },
    { id: 5, title: "Youth Service | Living Boldly", image: `${process.env.PUBLIC_URL}/message5.png` },
    { id: 6, title: "Prayer Night | Divine Encounter", image: `${process.env.PUBLIC_URL}/message6.png` },
    { id: 7, title: "Bible Study | John 3:16", image: `${process.env.PUBLIC_URL}/message3.png` },
  ];

  return (
    <section className="recent-messages">
      <h2 className="messages-title">Music</h2>
      <div className={`messages-container ${navOpen ? 'nav-open' : ''}`}>
        <div className="messages-row">
          {messageData.slice(0, Math.ceil(messageData.length / 2)).map((message) => (
            <div key={message.id} className="message-frame">
                <Link to={`/video/${message.id}`}>
              <div
                className="message-image"
                style={{ backgroundImage: `url(${message.image})` }}
              />
              </Link>
              <p className="message-title">{message.title}</p>
            </div>
          ))}
        </div>
        <div className="messages-row">
          {messageData.slice(Math.ceil(messageData.length / 2)).map((message) => (
            <div key={message.id} className="message-frame">
                <Link to={`/video/${message.id}`}>
              <div
                className="message-image"
                style={{ backgroundImage: `url(${message.image})` }}
              />
              </Link>
              <p className="message-title">{message.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Music;