import React, {PropTypes, Component} from 'react';
import {FormattedNumber} from 'react-intl';

export default class Navigator extends Component {

  static propTypes = {
    items: PropTypes.array,
    nameKey: PropTypes.string
  };

  static defaultProps = {
    items: [],
    nameKey: 'name'
  }

  state = {
    index: 0
  };

  componentDidMount() {}

  componentDidUpdate() {}

  onClickHandler(dir) {
    const length = this.props.items.length;
    const idx = this.state.index;
    if (dir === 'prev') {
      if (idx > 0) this.setState({index: this.state.index - 1});
    } else {
      if (idx < length) this.setState({index: this.state.index + 1});
    }
  }

  render() {
    const showNavi = this.props.items.length ? true : false;
    const item = this.props.items.length ? this.props.items[this.state.index] : {};
    return (
      <div className='navigator'>
        {showNavi &&
          <div className='inner'>
            <div className='top'>
              <button className='arrow btn col' onClick={this.onClickHandler.bind(this, 'prev')}>
                <svg className={'icon prev-arrow small' }>
                  <use xlinkHref='main.svg#prev-arrow' />
                </svg>
              </button>
              <h3 className='rank col'>{this.state.index + 1}</h3><span className='col count'><FormattedNumber value={item.total} /> photos</span>
              <button className='arrow btn col' onClick={this.onClickHandler.bind(this, 'next')}>
                <svg className={'icon next-arrow small' }>
                  <use xlinkHref='main.svg#next-arrow' />
                </svg>
              </button>
            </div>
            <p className='name'>{item[this.props.nameKey]}</p>
          </div>
        }
      </div>
    );
  }
}
