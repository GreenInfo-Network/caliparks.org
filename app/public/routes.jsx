import React from 'react';
import Router from 'react-router';

import App from './views/app.jsx';
import Home from './views/home.jsx';
import Parks from './views/parks.jsx';
import Explore from './views/explore.jsx';
import Discover from './views/discover.jsx';
import Wander from './views/wander.jsx';

const routes = (
  <Router.Route path='/' handler={App}>
    <Router.DefaultRoute name='home' handler={Home} />
    <Router.Route name='parks' path='parks/:id' handler={Parks} />
    <Router.Route name='explore' handler={Explore} />
    <Router.Route name='discover' handler={Discover} />
    <Router.Route name='wander' handler={Wander} />
  </Router.Route>
);

export default routes;
