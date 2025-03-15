import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Reelz.css'; // Import associated styles

// Reelz section component
const Reelz = ({ navOpen }) => {
  const reelData = [
    { id: 1, title: "Ultimate Worship Mix | Church of God", image: `${process.env.PUBLIC_URL}/reel1.png` },
    { id: 2, title: "Sermon Highlights | Faith Journey", image: `${process.env.PUBLIC_URL}/reel2.png` },
    { id: 3, title: "Praise Session | Zionhill Live", image: `${process.env.PUBLIC_URL}/reel5.png` },
    { id: 4, title: "Daily Devotion | Morning Prayer", image: `${process.env.PUBLIC_URL}/reel3.png` },
    { id: 5, title: "Gospel Hits | Sunday Service", image: `${process.env.PUBLIC_URL}/reel4.png` },
    { id: 6, title: "Testimony Time | Grace Stories", image: `${process.env.PUBLIC_URL}/reel5.png` },
  ];

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <section className="reelz">
      <h2 className="reelz-head">Reels</h2>
      <div className={`reelz-container ${navOpen ? 'nav-open' : ''}`}>
        {reelData.map((reel) => (
          <div key={reel.id} className="reelz-frame">
            <Link to="/reels"> {/* All link to Reels Preview */}
              <div
                className="reelz-image"
                style={{ backgroundImage: `url(${reel.image})` }}
              >
                <button
                  className={`favorite-icon ${favorites.includes(reel.id) ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); toggleFavorite(reel.id); }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/favorite-icon.png`}
                    alt="Favorite"
                  />
                </button>
              </div>
            </Link>
            <p className="reelz-title">{reel.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reelz;