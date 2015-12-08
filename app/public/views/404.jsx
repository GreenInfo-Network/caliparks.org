import React, {PropTypes, Component} from 'react';
import {FormattedMessage} from 'react-intl';

export default class NotFound extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className='container'>
        <h3>
          <FormattedMessage
            id='not-found-msg'
            defaultMessage='Sorry the page you were looking for could not be found.'
          />
      </h3>
      </div>
    );
  }
}
