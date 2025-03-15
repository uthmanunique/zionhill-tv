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
import './Home.css';

const Home = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="home">
      <Header toggleNav={toggleNav} />
      <Navigation isOpen={isNavOpen} />
      <main className="home-content">
        <Hero id="hero-section" />
        <Reelz id="reelz-section" />
        <RecentMessages id="recent-messages-section"/>
        <Messages id="messages-section" />
        <Sports id="sports-section" />
        <Music id="music-section" />
        <News id="news-section" />
        <Documentaries id="documentaries-section" />
        <Kiddies id="kiddies-section" />
      </main>
    </div>
  );
};

export default Home;