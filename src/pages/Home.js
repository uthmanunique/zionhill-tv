import React, { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Reelz from '../components/Reelz';
import RecentMessages from '../components/RecentMessages';
import Messages from '../components/Messages';
import Sports from '../components/Sports';
import Music from '../components/Music';
import News from '../components/News';
import Documentaries from '../components/Documentaries';
import Kiddies from '../components/Kiddies';
import './Home.css'; // Import associated styles

// Home screen component
const Home = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // State for navigation toggle

  // Toggle navigation visibility
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="home">
      <Header toggleNav={toggleNav} />
      <Navigation isOpen={isNavOpen} />
      <main className="home-content">
        <Hero id="hero-section" navOpen={isNavOpen} />
        <Reelz id="reelz-section" navOpen={isNavOpen} />
        <RecentMessages id="recent-messages-section" navOpen={isNavOpen} />
        <Messages id="messages-section" navOpen={isNavOpen} />
        <Sports id="sports-section" navOpen={isNavOpen} />
        <Music id="music-section" navOpen={isNavOpen} />
        <News id="news-section" navOpen={isNavOpen} />
        <Documentaries id="documentaries-section" navOpen={isNavOpen} />
        <Kiddies id="kiddies-section" navOpen={isNavOpen} />
      </main>
    </div>
  );
};

export default Home;