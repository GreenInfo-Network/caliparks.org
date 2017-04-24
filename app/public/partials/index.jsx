import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureComponent from 'react-pure-render/component';

import Header from './header';
import SliderMostShared from './sliderMostShared';

export default class HomeIndex extends PureComponent {
  static propTypes = {
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    width: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
    autoplay: PropTypes.bool,
    autoplaySpeed: PropTypes.number,
    featuredParks: PropTypes.shape({
      parks: PropTypes.array
    }).isRequired
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this.refs.header);
    const slider = ReactDOM.findDOMNode(this.refs.parkslider);
    const height = this.props.height - node.offsetHeight;
    slider.style.height = height + 'px';
  }

  getHeight() {
    if (this.props.height === 'auto') {
      return this.props.height;
    }
    return (this.props.height || 700) - 8 + 'px';
  }

  render() {
    const headerHeight = this.props.height - 352;
    const sliderHeight = this.props.height - 409;

    return (
      <div id='index-section' className='full-height theme-white'>
        <div className='wrapper row' style={{height: this.getHeight()}}>
          <div className='col-twelve'>
            <Header
              ref='header'
              headerHeight={headerHeight}
              images={this.props.images}
              autoplay={this.props.autoplay}
              autoplaySpeed={this.props.autoplaySpeed} {...this.props}/>
            <SliderMostShared ref='parkslider' containerHeight={sliderHeight} featuredParks={this.props.featuredParks} width={this.props.width}/>
          </div>
        </div>
        <div className='scroll-helper-arrow down'/>
      </div>
    );
  }

}
