import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import Slider from 'react-slick';

import Nav from './nav';

export default class Header extends PureComponent {
  static propTypes = {
    images: PropTypes.array.isRequired,
    autoplay: PropTypes.bool,
    autoplaySpeed: PropTypes.number,
    headerHeight: PropTypes.number.isRequired
  };

  static defaultProps = {
    autoplay: false,
    autoplaySpeed: 5000
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() { }

  getImages() {
    return this.props.images || [];
  }

  imgError(evt) {
    console.log('EVT: ', evt.target);
  }

  makeSlides() {
    return this.getImages().map((src, idx) => {
      return (
        <div key={idx}><img src={src} onError={this.imgError} /></div>
      );
    });
  }

  render() {
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      autoplay: this.props.autoplay,
      autoplaySpeed: this.props.autoplaySpeed,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      centerMode: true,
      initialSlide: 0,
      variableWidth: true,
      centerPadding: '100px'
    };

    let headerHeight = this.props.headerHeight - 77 - 8;
    if (headerHeight > 332) headerHeight = 332;

    return (
      <header>
        <div className='pos-relative' style={{height: headerHeight + 'px', overflow: 'hidden'}}>
          <div id='logo-banner' className='col'>
            <img src='assets/svgs/header-banner.svg'/>
          </div>
          <div ref='slider' className='slider-home col'>
            <Slider {...settings}>
              {this.makeSlides()}
            </Slider>
          </div>
        </div>
        <Nav wanderID={this.props.wanderID}/>
      </header>
    );
  }

}
