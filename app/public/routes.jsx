import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Layout from './views/layout.jsx';
import Home from './views/home.jsx';
import Parks from './views/parks.jsx';
import Explore from './views/explore.jsx';
import Discover from './views/discover.jsx';
import Wander from './views/wander.jsx';

const routes = (
  <Route path='/' component={Layout}>
    <IndexRoute component={Home} />
    <Route path='parks/:id' component={Parks} />
    <Route path='explore' component={Explore} />
    <Route path='discover' component={Discover} />
    <Route path='wander' component={Wander} />
    <Redirect from='parks' to='/' />
  </Route>
);

export default routes;
