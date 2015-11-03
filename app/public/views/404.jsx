import React, {PropTypes} from 'react';

export default class NotFound extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render() {
    return (
      <h3>URL: {this.props.url} - Not Found (404)</h3>
    );
  }
}
