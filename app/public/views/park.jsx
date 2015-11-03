import React, {PropTypes} from 'react';

export default class Park extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    return (
      <h3>Park: {this.props.params.id}</h3>
    );
  }
}
