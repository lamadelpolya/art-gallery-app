import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import UserProfile from './pages/UserProfilePage';
import ArtistSubmissionForm from '../src/components/artworks/ArtistSubmissionForm'
import ArtistDetailPage from "./pages/ArtistDetailPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUsPage from './pages/AboutUs';
import SearchResultsPage from './pages/SearchResultsPage';


function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <Navbar  searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<UserProfile/>} />
        <Route path="/submit-art" element={<ArtistSubmissionForm />} />
          <Route path="/artist/:id" element={<ArtistDetailPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/search" element={<SearchResultsPage searchQuery={searchQuery} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
