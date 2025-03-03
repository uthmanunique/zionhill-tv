import React from 'react';
import './Messages.css'; // Import associated styles

// Messages section component
const Messages = ({ navOpen }) => {
  // Mock data for messages (replace with dynamic data later)
  const messageData = [
    { id: 1, title: "Sunday Sermon | Love and Peace", image: `${process.env.PUBLIC_URL}/messages-1.jpg` },
    { id: 2, title: "Midweek Prayer | Strength", image: `${process.env.PUBLIC_URL}/messages-2.jpg` },
    { id: 3, title: "Special Service | Revival", image: `${process.env.PUBLIC_URL}/messages-3.jpg` },
    { id: 4, title: "Guest Preacher | Salvation", image: `${process.env.PUBLIC_URL}/messages-4.jpg` },
    { id: 5, title: "Youth Talk | Purpose", image: `${process.env.PUBLIC_URL}/messages-5.jpg` },
    { id: 6, title: "Evening Worship | Joy", image: `${process.env.PUBLIC_URL}/messages-6.jpg` },
    { id: 7, title: "Bible Study | Faith", image: `${process.env.PUBLIC_URL}/messages-7.jpg` },
  ];

  return (
    <section className="messages">
      <h2 className="messages-title">Messages</h2>
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

export default Messages;