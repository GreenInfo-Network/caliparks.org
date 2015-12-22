import React from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

class Nav extends React.Component {

  render() {
    return (
      <nav className='table' style={{height: this.props.height + 'px'}}>
        <div className='table-cell'>
        <ul>
          <li>
            <a href='#explore'>
              <h5>
                <FormattedMessage
                  id='explore'
                  defaultMessage='Explore'
                />
              </h5>
              <div className='desc'>
                <FormattedHTMLMessage
                  id='explore.description'
                  defaultMessage={`See what's happening in<br/>parks near you`} />
              </div>
            </a>
          </li>
          <li>
            <a href='#discover'>
              <h5>
                <FormattedMessage
                  id='discover'
                  defaultMessage='Discover'
                />
              </h5>
              <div className='desc'>
                <FormattedHTMLMessage
                  id='discover.description'
                  defaultMessage={`Learn more about parks<br/>across the state`} />
              </div>
            </a>
          </li>
          <li>
            <a href='/wander'>
              <h5>
                <FormattedMessage
                  id='wander'
                  defaultMessage='Wander'
                />
              </h5>
              <div className='desc'>
                <FormattedHTMLMessage
                  id='wander.description'
                  defaultMessage={`Find out more about one<br/>of our featured parks`} />
              </div>
            </a>
          </li>
        </ul>
        </div>
      </nav>
    );
  }

}

export default Nav;
