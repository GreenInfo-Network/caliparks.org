import React from 'react';
import {IndexRoute, Redirect, Route, Router} from 'react-router';

import {AppContainer} from './views/app.jsx';
import Layout from './views/layout.jsx';
import NotFound from './views/404.jsx';
import {ParkContainer} from './views/park.jsx';

export default (
  <Router>
    <Route path='/' component={Layout}>
      <IndexRoute component={AppContainer} />

      <Route path='discover' component={NotFound} />
      <Route path='explore' component={NotFound} />
      <Route path='park/:id' component={ParkContainer} />
      <Route path='wander' component={NotFound} />

      <Redirect from='parks/:id' to='/park/:id' />
      <Redirect from='parks' to='/' />

      <Route path='*' component={NotFound} />
    </Route>
  </Router>
);
