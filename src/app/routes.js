import React from 'react';
import { Route, DefaultRoute } from 'react-router';

// -- View Components
import App from './views/App.jsx';
import Home from './views/Home.jsx';
import Park from './views/Park.jsx';
import About from './views/About.jsx';
import Wander from './views/Wander.jsx';
import Discover from './views/Discover.jsx';
import Explore from './views/Explore.jsx';

const routes = (
  <Route path='/' handler={ App }>
    <DefaultRoute name='home' handler={ Home }/>
    <Route name='park' path='/park/:id' handler={ Park }/>
    <Route name='about' path='/about' handler={ About }/>
    <Route name='explore' path='/explore' handler={ Explore }/>
    <Route name='discover' path='/discover' handler={ Discover }/>
    <Route name='wander' path='/wander' handler={ Wander }/>
  </Route>
);

export default routes;
