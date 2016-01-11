import React, { PropTypes } from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

class Nav extends React.Component {
  static propTypes = {
    wanderID: PropTypes.number
  };

  render() {
    const wanderHref = (this.props.wanderID && !isNaN(this.props.wanderID)) ? '/park/' + this.props.wanderID : '/wander';
    return (
      <nav className='table'>
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
            <a href={wanderHref}>
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
