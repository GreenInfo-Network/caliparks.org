import React from 'react';
import PureComponent from 'react-pure-render/component';

export class NonFullscreenSection extends PureComponent {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
