import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import VideoPreview from './components/VideoPreview';
import ReelsPreview from './components/ReelsPreview';
import LiveStreamPreview from './components/LiveStreamPreview';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Partnership from './components/Partnership';
import Support from './components/Support';
import ZMC from './components/ZMC';
import SearchResults from './components/SearchResults';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<VideoPreview />} />
          <Route path="/reels" element={<ReelsPreview />} />
          <Route path="/live/:id" element={<LiveStreamPreview />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/support" element={<Support />} />
          <Route path="/zmc" element={<ZMC />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;