import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {

  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to='/explore' poo='foo'>
              <h5>Explore</h5>
              <div><span>See what's happening in<br/>parks near you</span></div>
            </Link>
          </li>
          <li>
            <Link to='/discover'>
              <h5>Discover</h5>
              <div><span>Learn more about parks<br/>across the state</span></div>
            </Link>
          </li>
          <li>
            <Link to='/'>
              <h5>Wander</h5>
              <div><span>Find out more about one<br/>of our featured parks</span></div>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

}

export default Nav;
