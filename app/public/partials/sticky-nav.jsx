import React from 'react';
import { Link } from 'react-router';

class StickyNav extends React.Component {

  render() {
    return (
      <div className='sub-nav'>
        <h1><Link to='/'>Caliparks</Link></h1>
      </div>
    );
  }

}

export default StickyNav;
