import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import ArtistDetailPage from "./pages/ArtistDetailPage";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/" component={MainPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/artists/:id" component={ArtistDetailPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
