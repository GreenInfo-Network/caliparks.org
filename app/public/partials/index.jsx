import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

import Header from './header';
import SliderMostShared from './sliderMostShared';

export default class HomeIndex extends PureComponent {
  static propTypes = {
    height: PropTypes.number.isRequired,
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

  componentDidUpdate() { }

  getHeight() {
    return this.props.height || 700;
  }

  render() {
    const headerHeight = this.props.height - 352;
    return (
      <div id='index-section' className='full-height theme-white'>
        <div className='wrapper row' style={{height: (this.getHeight() - 8) + 'px'}}>
          <div className='col-twelve'>
            <Header
              heightHeight={headerHeight}
              images={this.props.images}
              autoplay={this.props.autoplay}
              autoplaySpeed={this.props.autoplaySpeed} {...this.props}/>
            <SliderMostShared featuredParks={this.props.featuredParks} width={this.props.width}/>
          </div>
        </div>
        <div className='scroll-helper-arrow down'/>
      </div>
    );
  }

}
