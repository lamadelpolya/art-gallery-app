import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import UserProfile from "./pages/UserProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ArtistSubmissionForm from "../src/components/artworks/ArtistSubmissionForm";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUsPage from "./pages/AboutUs";
import SearchResultsPage from "./pages/SearchResultsPage";
import ArtworkDetailPage from "./pages/ArtworkDetailPage";
import CollectionsPage from "./pages/CollectionsPage";
import ExhibitionsPage from "./pages/ExhibitionPage";
import UserDashboard from "./pages/UserDashboard";
import AddArtwork from "./components/artworks/AddArtwork";


function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artworks/add" element={<AddArtwork />} />
          <Route path="/main" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfilePage/>} />
          <Route path="/submit-art" element={<ArtistSubmissionForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/artworks/:artworkId" element={<ArtworkDetailPage/>} />
          <Route path="/collections" element={<CollectionsPage/>} />
          <Route path="/exhibitions" element={<ExhibitionsPage/>} />
          <Route path="/dashboard" element={<UserDashboard/>} />
          <Route
            path="/search"
            element={<SearchResultsPage searchQuery={searchQuery} />}
          />
       
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
