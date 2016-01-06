import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import {FormattedMessage} from 'react-intl';

export default class RefineButton extends PureComponent {
  static propTypes = {
    onClickHandler: PropTypes.func,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    disabled: false
  }

  componentDidMount() {}

  componentDidUpdate() {}

  onClick() {
    const {onClickHandler} = this.props;
    if (typeof onClickHandler === 'function') {
      onClickHandler();
    }
  }

  render() {
    return (
      <button className='refine-btn btn' onClick={this.onClick.bind(this)} disabled={this.props.disabled}>
        <FormattedMessage
          id='refine_btn'
          defaultMessage={'Refine Search Area'} />
      </button>
    );
  }
}
