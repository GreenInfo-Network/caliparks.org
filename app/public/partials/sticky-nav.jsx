import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';

export default class StickyNav extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  getClassName() {
    if (!this.props.className) return 'sub-nav';
    return this.props.className + ' sub-nav';
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <h1><a href='/#index'>Caliparks</a></h1>
        <hr/>
      </div>
    );
  }
}
