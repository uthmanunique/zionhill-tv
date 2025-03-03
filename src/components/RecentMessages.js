import React from 'react';
import './RecentMessages.css'; // Import associated styles

// Recent Messages section component
const RecentMessages = ({ navOpen }) => {
  // Mock data for recent messages (replace with dynamic data later)
  const messageData = [
    { id: 1, title: "Sunday Sermon | Grace and Truth", image: `${process.env.PUBLIC_URL}/message-1.jpg` },
    { id: 2, title: "Midweek Teaching | Faith Foundations", image: `${process.env.PUBLIC_URL}/message-2.jpg` },
    { id: 3, title: "Special Event | Healing Service", image: `${process.env.PUBLIC_URL}/message-3.jpg` },
    { id: 4, title: "Guest Speaker | Hope Renewed", image: `${process.env.PUBLIC_URL}/message-4.jpg` },
    { id: 5, title: "Youth Service | Living Boldly", image: `${process.env.PUBLIC_URL}/message-5.jpg` },
    { id: 6, title: "Prayer Night | Divine Encounter", image: `${process.env.PUBLIC_URL}/message-6.jpg` },
    { id: 7, title: "Bible Study | John 3:16", image: `${process.env.PUBLIC_URL}/message-7.jpg` },
  ];

  return (
    <section className="recent-messages">
      <h2 className="messages-title">Recently Added Messages</h2>
      <div className={`messages-container ${navOpen ? 'nav-open' : ''}`}>
        <div className="messages-row">
          {messageData.slice(0, Math.ceil(messageData.length / 2)).map((message) => (
            <div key={message.id} className="message-frame">
              <div
                className="message-image"
                style={{ backgroundImage: `url(${message.image})` }}
              />
              <p className="message-title">{message.title}</p>
            </div>
          ))}
        </div>
        <div className="messages-row">
          {messageData.slice(Math.ceil(messageData.length / 2)).map((message) => (
            <div key={message.id} className="message-frame">
              <div
                className="message-image"
                style={{ backgroundImage: `url(${message.image})` }}
              />
              <p className="message-title">{message.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentMessages;