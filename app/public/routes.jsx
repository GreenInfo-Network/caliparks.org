import React from 'react';
import {IndexRoute, Redirect, Route, Router} from 'react-router';

import {AppContainer} from './views/app';
import Layout from './views/layout';
import NotFound from './views/404';
import {ParkContainer} from './views/park';
import {ActivityContainer} from './views/activity';

export default (
  <Router>
    <Route path='/' component={Layout}>
      <IndexRoute component={AppContainer} />

      <Route path='discover' component={NotFound} />
      <Route path='explore' component={NotFound} />
      <Route path='park/:id' component={ParkContainer} />
      <Route path='activity/:activity' component={ActivityContainer} />

      <Redirect from='parks/:id' to='/park/:id' />
      <Redirect from='parks' to='/' />

      <Route path='*' component={NotFound} />
    </Route>
  </Router>
);
