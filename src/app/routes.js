import React from 'react';
import { Route, DefaultRoute } from 'react-router';

// -- View Components
import App from './views/App.jsx';
import Home from './views/Home.jsx';
import Park from './views/Park.jsx';
import About from './views/About.jsx';

const routes = (
  <Route path='/' handler={ App }>
    <DefaultRoute handler={ Home }/>
    <Route path='/park' handler={ Park }/>
    <Route path='/about' handler={ About }/>
  </Route>
);

export default routes;
