import React, {PropTypes, Component} from 'react';

export default class NotFound extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className='container'>
        <h3>URL: {this.props.url} - Not Found (404)</h3>
      </div>
    );
  }
}
