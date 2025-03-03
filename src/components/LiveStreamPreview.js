import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import './LiveStreamPreview.css'; // Import associated styles

// Live Stream Preview component
const LiveStreamPreview = () => {
  const { id } = useParams(); // Get live stream ID from URL
  const [isNavOpen, setIsNavOpen] = useState(false); // State for navigation toggle
  const [likes, setLikes] = useState(150); // Mock like count
  const [dislikes, setDislikes] = useState(10); // Mock dislike count
  const [comments, setComments] = useState([
    { id: 1, user: "LiveFan1", profilePic: `${process.env.PUBLIC_URL}/user.png`, text: "Amazing live stream!", timestamp: "2 mins ago" },
    { id: 2, user: "LiveFan2", profilePic: `${process.env.PUBLIC_URL}/user2.png`, text: "Praise God!", timestamp: "5 mins ago" },
  ]); // Mock live comments
  const [newComment, setNewComment] = useState(''); // New comment input
  const videoRef = useRef(null); // Reference to video element

  // Toggle navigation visibility
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Handle Like/Dislike clicks
  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const handleDislike = () => {
    setDislikes((prev) => prev + 1);
  };

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        { id: prev.length + 1, user: "CurrentUser", profilePic: `${process.env.PUBLIC_URL}/current.png`, text: newComment, timestamp: "Just now" },
      ]);
      setNewComment(''); // Clear input
    }
  };

  // Handle love emoji submission
  const handleLoveSubmit = () => {
    setComments((prev) => [
      ...prev,
      { id: prev.length + 1, user: "CurrentUser", profilePic: `${process.env.PUBLIC_URL}/current.png`, text: "❤️", timestamp: "Just now" },
    ]);
  };

  // Mock live stream data (replace with dynamic data later)
  const liveStream = {
    id,
    title: "Sunday Service Live | Faith Tabernacle",
    url: `${process.env.PUBLIC_URL}/test-live.mp4`, // Placeholder live video
  };

  return (
    <div className="live-stream-preview">
      <Header toggleNav={toggleNav} />
      <Navigation isOpen={isNavOpen} />
      <main className="live-stream-content">
        {/* Video Player Section */}
        <div className={`live-player-container ${isNavOpen ? 'nav-open' : ''}`}>
          <div className="live-frame">
            <video
              ref={videoRef}
              className="live-player"
              autoPlay // Auto-play for live stream
              muted // Muted by default for accessibility
              controls={false} // No custom controls for now
            >
              <source src={liveStream.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="live-indicator">
              <span className="live-dot"></span>
              <span className="live-text">Live</span>
            </div>
          </div>
          <h1 className="live-title">{liveStream.title}</h1>
          <div className="live-actions">
            <div className="action-item">
              <img
                src={`${process.env.PUBLIC_URL}/like.png`}
                alt="Like"
                className="action-icon"
                onClick={handleLike}
              />
              <span>{likes}</span>
            </div>
            <div className="action-item">
              <img
                src={`${process.env.PUBLIC_URL}/dislike.png`}
                alt="Dislike"
                className="action-icon"
                onClick={handleDislike}
              />
              <span>{dislikes}</span>
            </div>
            <div className="action-item">
              <img src={`${process.env.PUBLIC_URL}/share.png`} alt="Share" className="action-icon" />
              <span>Share</span>
            </div>
          </div>
        </div>

        {/* Live Comments Section (Right Panel) */}
        <div className="live-comments-right">
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="comment-input"
            />
            <button type="button" onClick={handleLoveSubmit} className="love-button">
              <img src={`${process.env.PUBLIC_URL}/heart.png`} alt="Love" className="love-icon" />
            </button>
          </form>
          <div className="comments-feed">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <img src={comment.profilePic} alt={comment.user} className="profile-pic" />
                <div className="comment-content">
                  <span className="comment-user">{comment.user}</span>
                  <span className="comment-text">{comment.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveStreamPreview;