import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import './ReelsPreview.css'; // Import associated styles

// Reels Preview component
const ReelsPreview = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // State for navigation toggle
  const [currentReelIndex, setCurrentReelIndex] = useState(0); // Track current reel
  const [isPlaying, setIsPlaying] = useState(false); // Play/Pause state
  const [volume, setVolume] = useState(1); // Volume level (0 to 1)
  const [progress, setProgress] = useState(0); // Video progress (0 to 1)
  const [likes, setLikes] = useState(50); // Mock like count
  const [dislikes, setDislikes] = useState(2); // Mock dislike count
  const [showComments, setShowComments] = useState(false); // Toggle comments
  const videoRef = useRef(null); // Reference to video element
  const touchStartY = useRef(null); // Track touch start position

  // Toggle navigation visibility
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Mock reel data (replace with dynamic data later)
  const reelData = [
    { id: 1, title: "Ultimate Worship Mix | Church of God", url: `${process.env.PUBLIC_URL}/testreel1.mp4` },
    { id: 2, title: "Sermon Highlights | Faith Journey", url: `${process.env.PUBLIC_URL}/testreel.mp4` },
    { id: 3, title: "Praise Session | Zionhill Live", url: `${process.env.PUBLIC_URL}/testreel1.mp4` },
    { id: 4, title: "Daily Devotion | Morning Prayer", url: `${process.env.PUBLIC_URL}/testreel.mp4` },
    { id: 5, title: "Gospel Hits | Sunday Service", url: `${process.env.PUBLIC_URL}/testreel1.mp4` },
    { id: 6, title: "Testimony Time | Grace Stories", url: `${process.env.PUBLIC_URL}/testreel.mp4` },
  ];

  // Video control handlers
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handleProgress = () => {
    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    setProgress(currentTime / duration);
  };

  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    videoRef.current.currentTime = newProgress * videoRef.current.duration;
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Navigation handlers
  const scrollUp = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex((prev) => prev - 1);
      videoRef.current.pause();
      setIsPlaying(false);
      videoRef.current.currentTime = 0;
      setProgress(0);
    }
  };

  const scrollDown = () => {
    if (currentReelIndex < reelData.length - 1) {
      setCurrentReelIndex((prev) => prev + 1);
      videoRef.current.pause();
      setIsPlaying(false);
      videoRef.current.currentTime = 0;
      setProgress(0);
    }
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    if (Math.abs(deltaY) > 50) { // Threshold for swipe detection
      if (deltaY > 0) scrollDown();
      else scrollUp();
      touchStartY.current = null; // Reset after swipe
    }
  };

  const handleTouchEnd = () => {
    touchStartY.current = null;
  };

  // Handle Like/Dislike clicks
  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const handleDislike = () => {
    setDislikes((prev) => prev + 1);
  };

  // Toggle comments visibility
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // Update video source when reel changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentReelIndex]);

  // Mock comments data
  const comments = [
    { id: 1, user: "ReelFan", text: "Love this worship mix!", timestamp: "1 hour ago" },
    { id: 2, user: "MusicLover", text: "So uplifting!", timestamp: "3 hours ago" },
  ];

  const currentReel = reelData[currentReelIndex];

  return (
    <div className="reels-preview">
      <Header toggleNav={toggleNav} />
      <Navigation isOpen={isNavOpen} />
      <main
        className="reels-content"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={`reels-player-container ${isNavOpen ? 'nav-open' : ''}`}>
          <div className="reels-frame">
            <video
              ref={videoRef}
              className="reels-player"
              onTimeUpdate={handleProgress}
              loop
            >
              <source src={currentReel.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="reels-controls">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={progress}
                onChange={handleSeek}
                className="progress-bar"
              />
              <div className="control-buttons">
                <button onClick={togglePlay} className="control-button">
                  <img
                    src={`${process.env.PUBLIC_URL}/${isPlaying ? 'pause-icon.png' : 'play.png'}`}
                    alt={isPlaying ? "Pause" : "Play"}
                    className="control-icon"
                  />
                </button>
                <div className="volume-control">
                  <img src={`${process.env.PUBLIC_URL}/volume-icon.png`} alt="Volume" className="control-icon" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                  />
                </div>
                <button onClick={toggleFullScreen} className="control-button">
                  <img src={`${process.env.PUBLIC_URL}/fullscreen-icon.png`} alt="Full Screen" className="control-icon" />
                </button>
              </div>
            </div>
          </div>
          <div className="reels-actions">
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
            <div className="action-item">
              <img
                src={`${process.env.PUBLIC_URL}/comment-icon.png`}
                alt="Comments"
                className="action-icon"
                onClick={toggleComments}
              />
              <span>{comments.length}</span>
            </div>
          </div>
          {showComments && (
            <div className="reels-comments-popup">
              <h1 className="reels-title">{currentReel.title}</h1>
              <div className="comments-section">
                <div className="comments-header">
                  <span>{comments.length} Comments</span>
                  <select className="sort-by">
                    <option>Sort by: Top Comments</option>
                    <option>Sort by: Newest First</option>
                  </select>
                </div>
                {comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <p><strong>{comment.user}</strong> <span>{comment.timestamp}</span></p>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="reels-navigation">
          <button onClick={scrollUp} className="nav-button" disabled={currentReelIndex === 0}>
            <img src={`${process.env.PUBLIC_URL}/up-icon.png`} alt="Up" className="nav1-icon" />
          </button>
          <button onClick={scrollDown} className="nav-button" disabled={currentReelIndex === reelData.length - 1}>
            <img src={`${process.env.PUBLIC_URL}/down-icon.png`} alt="Down" className="nav1-icon" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default ReelsPreview;