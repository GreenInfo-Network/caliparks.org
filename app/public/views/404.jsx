import React, {PropTypes} from 'react';
import Layout from './layout.jsx';

class NotFound extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render() {
    return (
      <Layout {...this.props}>
        <h3>URL: {this.props.url} - Not Found(404)</h3>
      </Layout>
    );
  }

}

export default NotFound;
