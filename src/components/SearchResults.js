import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import './SearchResults.css';

const SearchResults = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeTag, setActiveTag] = useState('All');
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || 'No query';

  // Mock search results (20 items)
  const allResults = [
    { id: 1, title: "Ultimate Worship Mix", section: "Reels", timestamp: "2 days ago", image: `${process.env.PUBLIC_URL}/reel-1.jpg` },
    { id: 2, title: "Sunday Sermon", section: "Messages", timestamp: "1 week ago", image: `${process.env.PUBLIC_URL}/message1.png` },
    { id: 3, title: "Live Event Highlights", section: "Live", timestamp: "3 days ago", image: `${process.env.PUBLIC_URL}/event2.png` },
    { id: 4, title: "Healing Service", section: "Messages", timestamp: "5 days ago", image: `${process.env.PUBLIC_URL}/message2.png` },
    { id: 5, title: "Praise Session", section: "Reels", timestamp: "1 day ago", image: `${process.env.PUBLIC_URL}/reel-2.jpg` },
    { id: 6, title: "Sports Recap", section: "Sports", timestamp: "4 days ago", image: `${process.env.PUBLIC_URL}/sports-1.jpg` },
    { id: 7, title: "Worship Mix 2", section: "Music", timestamp: "6 days ago", image: `${process.env.PUBLIC_URL}/music-1.jpg` },
    { id: 8, title: "News Update", section: "News", timestamp: "2 hours ago", image: `${process.env.PUBLIC_URL}/news-1.jpg` },
    { id: 9, title: "Documentary: Faith", section: "Documentaries", timestamp: "1 month ago", image: `${process.env.PUBLIC_URL}/doc-1.jpg` },
    { id: 10, title: "Kids Story", section: "Kiddies", timestamp: "3 days ago", image: `${process.env.PUBLIC_URL}/kiddies-1.jpg` },
    { id: 11, title: "Prayer Night", section: "Messages", timestamp: "2 weeks ago", image: `${process.env.PUBLIC_URL}/message3.png` },
    { id: 12, title: "Reels Highlight", section: "Reels", timestamp: "5 hours ago", image: `${process.env.PUBLIC_URL}/reel-3.jpg` },
    { id: 13, title: "Live Worship", section: "Live", timestamp: "1 day ago", image: `${process.env.PUBLIC_URL}/event1.png` },
    { id: 14, title: "Basketball Finals", section: "Sports", timestamp: "1 week ago", image: `${process.env.PUBLIC_URL}/sports-2.jpg` },
    { id: 15, title: "Gospel Hits", section: "Music", timestamp: "3 days ago", image: `${process.env.PUBLIC_URL}/music-2.jpg` },
    { id: 16, title: "Charity News", section: "News", timestamp: "4 days ago", image: `${process.env.PUBLIC_URL}/news-2.jpg` },
    { id: 17, title: "Missions Doc", section: "Documentaries", timestamp: "2 months ago", image: `${process.env.PUBLIC_URL}/doc-2.jpg` },
    { id: 18, title: "Noah’s Ark", section: "Kiddies", timestamp: "1 week ago", image: `${process.env.PUBLIC_URL}/kiddies-2.jpg` },
    { id: 19, title: "Midweek Prayer", section: "Messages", timestamp: "6 days ago", image: `${process.env.PUBLIC_URL}/message4.png` },
    { id: 20, title: "Live Recap", section: "Live", timestamp: "2 days ago", image: `${process.env.PUBLIC_URL}/event3.png` },
  ];

  // Filter results based on active tag
  const filteredResults = activeTag === 'All'
    ? allResults
    : allResults.filter((result) => result.section === activeTag);

  const tags = ['All', 'Reels', 'Messages', 'Live', 'Sports', 'Music', 'News', 'Documentaries', 'Kiddies'];

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <div className="search-results-screen">
      <Header toggleNav={toggleNav} />
      <Navigation isOpen={isNavOpen} />
      <main className={`search-results-content ${isNavOpen ? 'nav-open' : ''}`}>
        <div className="search-tags">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`tag-button ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="search-results-header">
          <h1>Search Results for "{query}"</h1>
          <p>{filteredResults.length} results found</p>
        </div>
        <div className="search-results-list">
          {filteredResults.map((result) => (
            <Link
              key={result.id}
              to={result.section === 'Live' ? `/live/${result.id}` : `/video/${result.id}`}
              className="result-item"
            >
              <div
                className="result-image"
                style={{ backgroundImage: `url(${result.image})` }}
              />
              <div className="result-info">
                <p className="result-title">{result.title}</p>
                <p className="result-section">{result.section}</p>
                <p className="result-timestamp">{result.timestamp}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;