import React from 'react';
import PureComponent from 'react-pure-render/component';
import { Link } from 'react-router';

export default class StickyNav extends PureComponent {
  render() {
    return (
      <div className='sub-nav'>
        <h1><Link to='/'>Caliparks</Link></h1>
      </div>
    );
  }
}
