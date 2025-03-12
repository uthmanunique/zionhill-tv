import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Header from './Header';
import Navigation from './Navigation';
import './VideoPreview.css';

console.log('VideoPreview component loaded');

const VideoPreview = () => {
  console.log('VideoPreview component rendering');

  const { id } = useParams();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [relatedVideos, setRelatedVideos] = useState([]);
  const videoRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  useEffect(() => {
    console.log('useEffect running - isAuthenticated:', isAuthenticated);
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to /signin');
      navigate('/signin');
      return;
    }

    const token = localStorage.getItem('token');

    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API response (video):', res.data);
        setVideo(res.data);
        setLikes(res.data.likes || 0);
        setDislikes(res.data.dislikes || 0);
      } catch (err) {
        console.error('Fetch video error:', err.response?.data || err.message);
        navigate('/zmc');
      }
    };

    const fetchRelatedVideos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/videos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API response (related videos):', res.data);
        const filtered = res.data.filter(v => v._id !== id).slice(0, 8);
        setRelatedVideos(filtered);
      } catch (err) {
        console.error('Fetch related videos error:', err.response?.data || err.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}/comments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API response (comments):', res.data);
        setComments(res.data);
      } catch (err) {
        console.error('Fetch comments error:', err.response?.data || err.message);
      }
    };

    fetchVideo();
    fetchRelatedVideos();
    fetchComments();
  }, [id, isAuthenticated, navigate]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
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

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(`http://localhost:5000/api/videos/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Like response:', res.data);
      setLikes(res.data.likes);
    } catch (err) {
      console.error('Like error:', err.response?.data || err.message);
    }
  };

  const handleDislike = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(`http://localhost:5000/api/videos/${id}/dislike`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Dislike response:', res.data);
      setDislikes(res.data.dislikes);
    } catch (err) {
      console.error('Dislike error:', err.response?.data || err.message);
    }
  };

  const handleShare = () => {
    const videoUrl = `${window.location.origin}/video/${id}`;
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: `Check out this video: ${video.title}`,
        url: videoUrl,
      }).catch((err) => console.error('Share error:', err));
    } else {
      navigator.clipboard.writeText(videoUrl)
        .then(() => alert('Video URL copied to clipboard!'))
        .catch((err) => console.error('Clipboard error:', err));
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(`http://localhost:5000/api/videos/${id}/comments`, { text: newComment }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Comment response:', res.data);
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Comment submit error:', err.response?.data || err.message);
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'top') {
      return (b.likes || 0) - (a.likes || 0);
    } else {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  console.log('Video state:', video);
  if (!video) {
    console.log('Rendering loading state');
    return (
      <div className="video-preview">
        <Header toggleNav={toggleNav} />
        <div className="video-frame loading-frame">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-preview">
      <Header toggleNav={toggleNav} />
      <Navigation isOpen={isNavOpen} />
      <main className="video-content">
        <div className={`video-player-container ${isNavOpen ? 'nav-open' : ''}`}>
          <div className="video-frame">
            <video
              ref={videoRef}
              className="video-player"
              onTimeUpdate={handleProgress}
              controls={false}
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
                      src={`${process.env.PUBLIC_URL}/${isPlaying ? 'pause.png' : 'Play.png'}`}
                      alt={isPlaying ? "Pause" : "Play"}
                      className="control-icon"
                    />
                  </button>
                  <button onClick={handleNext} className="control-button">
                    <img src={`${process.env.PUBLIC_URL}/next.png`} alt="Next" className="control-icon" />
                  </button>
                  <div className="volume-control">
                    <img src={`${process.env.PUBLIC_URL}/volume.png`} alt="Volume" className="control-icon" />
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
                    <img src={`${process.env.PUBLIC_URL}/language.png`} alt="Language" className="control-icon" />
                  </button>
                  <button className="control-button">
                    <img src={`${process.env.PUBLIC_URL}/cast.png`} alt="Cast" className="control-icon" />
                  </button>
                  <button onClick={toggleFullScreen} className="control-button">
                    <img src={`${process.env.PUBLIC_URL}/full-screen.png`} alt="Full Screen" className="control-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h1 className="video-title">{video.title}</h1>
          <div className="video-actions">
            <div className="action-items">
              <img
                src={`${process.env.PUBLIC_URL}/like.png`}
                alt="Like"
                className="action-icon"
                onClick={handleLike}
              />
              <span>{likes}</span>
            </div>
            <div className="action-items">
              <img
                src={`${process.env.PUBLIC_URL}/dislike.png`}
                alt="Dislike"
                className="action-icon"
                onClick={handleDislike}
              />
              <span>{dislikes}</span>
            </div>
            <div className="action-items">
              <img
                src={`${process.env.PUBLIC_URL}/share.png`}
                alt="Share"
                className="action-icon"
                onClick={handleShare}
              />
              <span>Share</span>
            </div>
          </div>
          <div className="comments-section">
            <div className="comments-header">
              <span>{comments.length} Comments</span>
              <select className="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="top">Sort by: Top Comments</option>
                <option value="newest">Sort by: Newest First</option>
              </select>
            </div>
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="comment-input"
              />
              <button type="submit" className="comment-submit">Post</button>
            </form>
            {sortedComments.map((comment) => (
              <div key={comment._id || comment.id} className="comment">
                <div className="comment-user">
                  <img
                    src={comment.profilePic || `${process.env.PUBLIC_URL}/default-profile.png`}
                    alt={comment.user}
                    className="comment-profile-pic"
                  />
                  <div>
                    <p><strong>{comment.user}</strong></p>
                    <p className="comment-timestamp">{new Date(comment.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="related-videos">
          <h2 className="related-title">Related Videos</h2>
          <div className="related-container">
            {relatedVideos.map((related) => (
              <Link
                key={related._id}
                to={`/video/${related._id}`}
                className="related-video"
              >
                <div
                  className="related-image"
                  style={{ backgroundImage: `url(${related.image})` }}
                />
                <div className="related-info">
                  <p className="related-video-title">{related.title}</p>
                  <p className="related-section">{related.section}</p>
                  <p className="related-timestamp">{new Date(related.createdAt || Date.now()).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPreview;