import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import Slider from 'react-slick';
import { Link } from 'react-router';
import {slice as loSlice} from 'lodash';

export default class SliderMostShared extends PureComponent {
  static propTypes = {
    featuredParks: PropTypes.shape({
      parks: PropTypes.array
    }).isRequired,
    width: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate() { }

  componentWillUnmount() { }

  onImageError(evt) {
    // TODO: Doesn't work when trying
    // to find slide by ref
    try {
      evt.target.parentNode.parentNode.style.display = 'none';
    } catch (e) {
      console.error(e);
    }
  }

  getParks() {
    return this.props.featuredParks.parks || [];
  }

  getSlidesToShowLength() {
    if (this.props.width === 0) return 4;
    return Math.max(1, Math.ceil((this.props.width) / 330));
  }

  makeSlides() {
    // sort slides based on count
    const slides = loSlice(this.getParks());
    slides.sort((a, b) => {
      return +b.count - +a.count;
    });

    return slides.map((park) => {
      return (
        <div ref={park.photoid} key={park.su_id} className='slide-container'>
          <Link to={`/park/${park.su_id}`}>
            <div className='overlay'><p className='place'>{park.su_name}</p></div>
            <img alt={park.su_name} onError={this.onImageError} src={park.standard_resolution}/>
          </Link>
        </div>
        );
    });
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: this.getSlidesToShowLength(),
      variableWidth: true,
      slidesToScroll: Math.max(1, this.getSlidesToShowLength() - 1),
      initialSlide: 0
    };

    const {containerHeight} = this.props;

    return (
      <div className='home-slider-container' style={{height: containerHeight + 'px'}}>
        <div className='home-slider-inner'>
          <div className='home-slider-wrap'>
            <div ref='slide-recent' className='slider-recent'>
              <Slider {...settings}>
                {this.makeSlides()}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
