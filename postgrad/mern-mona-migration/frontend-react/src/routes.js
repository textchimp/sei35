import React from 'react';

import {
  HashRouter as Router, Route
} from 'react-router-dom';

import ArtistsIndex from './components/ArtistsIndex';
import ArtistShow from './components/ArtistShow';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={ ArtistsIndex } />
      <Route exact path="/artists/:id" component={ ArtistShow } />
    </div>
  </Router>
);

export default Routes;
