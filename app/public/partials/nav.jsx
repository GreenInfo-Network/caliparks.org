import React from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import request from 'superagent';

class Nav extends React.Component {
  state = {
    wanderID: null
  };

  componentWillMount() {
    this.getWanderId();
  }

  componentWillUnmount() {}

  getWanderId() {
    request
      .get('/api/wander')
      .end((err, res) => {
        if (err) {
          console.error('Loading park search list failed!', err);
        } else {
          const data = JSON.parse(res.text);
          console.log('Wander ID: %s', data.id);
          this.setState({wanderID: data.id});
        }
      });
  }

  render() {
    const {wanderID} = this.state;
    const wanderHref = (wanderID && !isNaN(wanderID)) ? '/park/' + wanderID : '/wander';
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
