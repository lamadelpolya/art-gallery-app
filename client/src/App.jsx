import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import ArtistDetailPage from "./pages/ArtistDetailPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/main" component={MainPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/artist/:id" component={ArtistDetailPage} />
      </Switch>
      <Footer />
    </Router>
  );
}
export default App;
