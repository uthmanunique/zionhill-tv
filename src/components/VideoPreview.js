import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import './VideoPreview.css'; // Import associated styles

// Video Preview component
const VideoPreview = () => {
  const { id } = useParams(); // Get video ID from URL
  const [isNavOpen, setIsNavOpen] = useState(false); // State for navigation toggle
  const [likes, setLikes] = useState(120); // Mock like count
  const [dislikes, setDislikes] = useState(5); // Mock dislike count
  const [isPlaying, setIsPlaying] = useState(false); // Play/Pause state
  const [volume, setVolume] = useState(1); // Volume level (0 to 1)
  const [progress, setProgress] = useState(0); // Video progress (0 to 1)
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

  // Video control handlers
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    // Placeholder: Logic to play next video can be added here
    console.log("Next video clicked");
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

  // Mock video data (replace with dynamic data later)
  const video = {
    id,
    title: "21 DAYS OF PRAYER & FASTING | DAY 17 | 22, JANUARY 2025 | FAITH TABERNACLE OTA.",
    url: `${process.env.PUBLIC_URL}/test.mp4`, // Placeholder video
  };

  // Mock related videos data
  const relatedVideos = [
    { id: 1, title: "HEALING AND MIRACLE SERVICE | 5 JANUARY", section: "Music", timestamp: "15 days ago", image: `${process.env.PUBLIC_URL}/message1.png` },
    { id: 2, title: "SUNDAY SERMON | LOVE", section: "Messages", timestamp: "2 weeks ago", image: `${process.env.PUBLIC_URL}/message2.png` },
    { id: 3, title: "SPORTS HIGHLIGHTS | FAITH CUP", section: "Sports", timestamp: "10 days ago", image: `${process.env.PUBLIC_URL}/message3.png` },
    { id: 4, title: "WORSHIP MIX | PEACE", section: "Music", timestamp: "1 month ago", image: `${process.env.PUBLIC_URL}/message2.png` },
    { id: 5, title: "NEWS UPDATE | CHARITY", section: "News", timestamp: "3 days ago", image: `${process.env.PUBLIC_URL}/message1.png` },
    { id: 6, title: "DOCUMENTARY | MISSIONS", section: "Documentaries", timestamp: "20 days ago", image: `${process.env.PUBLIC_URL}/message5.png` },
    { id: 7, title: "KIDS STORY | NOAH", section: "Kiddies", timestamp: "5 days ago", image: `${process.env.PUBLIC_URL}/message3.png` },
    { id: 8, title: "PRAYER NIGHT | REVIVAL", section: "Messages", timestamp: "8 days ago", image: `${process.env.PUBLIC_URL}/message6.png` },
  ];

  // Mock comments data
  const comments = [
    { id: 1, user: "JohnDoe", text: "Amazing service, truly blessed!", timestamp: "2 hours ago" },
    { id: 2, user: "JaneSmith", text: "Powerful message, thank you!", timestamp: "1 day ago" },
  ];

  return (
    <div className="video-preview">
      <Header toggleNav={toggleNav} />
      <Navigation isOpen={isNavOpen} />
      <main className="video-content">
        {/* Video Player Section */}
        <div className={`video-player-container ${isNavOpen ? 'nav-open' : ''}`}>
          <div className="video-frame">
            <video
              ref={videoRef}
              className="video-player"
              onTimeUpdate={handleProgress} // Update progress as video plays
            >
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-controls">
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
                <div className="left-controls">
                  <button onClick={togglePlay} className="control-button">
                    <img
                      src={`${process.env.PUBLIC_URL}/${isPlaying ? 'pause-icon.png' : 'play-icon.png'}`}
                      alt={isPlaying ? "Pause" : "Play"}
                      className="control-icon"
                    />
                  </button>
                  <button onClick={handleNext} className="control-button">
                    <img src={`${process.env.PUBLIC_URL}/next-icon.png`} alt="Next" className="control-icon" />
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
                </div>
                <div className="right-controls">
                  <button className="control-button">
                    <img src={`${process.env.PUBLIC_URL}/language-icon.png`} alt="Language" className="control-icon" />
                  </button>
                  <button className="control-button">
                    <img src={`${process.env.PUBLIC_URL}/cast-icon.png`} alt="Cast" className="control-icon" />
                  </button>
                  <button onClick={toggleFullScreen} className="control-button">
                    <img src={`${process.env.PUBLIC_URL}/fullscreen-icon.png`} alt="Full Screen" className="control-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h1 className="video-title">{video.title}</h1>
          <div className="video-actions">
            <div className="action-item">
              <img
                src={`${process.env.PUBLIC_URL}/like-icon.png`}
                alt="Like"
                className="action-icon"
                onClick={handleLike}
              />
              <span>{likes}</span>
            </div>
            <div className="action-item">
              <img
                src={`${process.env.PUBLIC_URL}/dislike-icon.png`}
                alt="Dislike"
                className="action-icon"
                onClick={handleDislike}
              />
              <span>{dislikes}</span>
            </div>
            <div className="action-item">
              <img src={`${process.env.PUBLIC_URL}/share-icon.png`} alt="Share" className="action-icon" />
              <span>Share</span>
            </div>
          </div>
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

        {/* Related Videos Section */}
        <div className="related-videos">
          <h2 className="related-title">Related Videos</h2>
          <div className="related-container">
            {relatedVideos.map((video) => (
              <div key={video.id} className="related-video">
                <div
                  className="related-image"
                  style={{ backgroundImage: `url(${video.image})` }}
                />
                <div className="related-info">
                  <p className="related-video-title">{video.title}</p>
                  <p className="related-section">{video.section}</p>
                  <p className="related-timestamp">{video.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPreview;