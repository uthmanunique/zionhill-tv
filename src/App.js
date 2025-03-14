import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import VideoPreview from './components/VideoPreview';
import ReelsPreview from './components/ReelsPreview';
import LiveStreamPreview from './components/LiveStreamPreview';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Partnership from './components/Partnership';
import Connect from './components/Connect';
import ZMC from './components/ZMC';
import SearchResults from './components/SearchResults';
import ForgotPassword from './components/ForgotPassword';
import PraiseReport from './components/PraiseReport';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/video/:id" element={<ProtectedRoute element={<VideoPreview />} />} /> {/* Updated */}
            <Route path="/reels" element={<ProtectedRoute element={<ReelsPreview />} />} />
            <Route path="/live/:id" element={<ProtectedRoute element={<LiveStreamPreview />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/partnership" element={<ProtectedRoute element={<Partnership />} />} />
            <Route path="/connect-screen" element={<ProtectedRoute element={<Connect />} />} />
            <Route path="/zmc" element={<ProtectedRoute element={<ZMC />} />} />
            <Route path="/search" element={<ProtectedRoute element={<SearchResults />} />} />
            <Route path="/praise-report" element={<ProtectedRoute element={<PraiseReport />} />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;