import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ArtistDetailPage from './pages/ArtistDetailPage';
import CollectionPage from './pages/CollectionPage';
import ExhibitionPage from './pages/ExhibitionPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Navbar';

import ArtistListPage from './pages/ArtistListPage';

function App() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/artists" component={ArtistListPage} />
          <Route exact path="/artists/:id" component={ArtistDetailPage} />
          <Route exact path="/collections/:id" component={CollectionPage} />
          <Route exact path="/exhibitions/:id" component={ExhibitionPage} />
          <Route exact path="/main" component={MainPage} />
        </Switch>
        <Footer />
      </Router>
    );
  }

export default App;
     

