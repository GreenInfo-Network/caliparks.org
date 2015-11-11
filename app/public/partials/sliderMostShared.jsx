import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import Slider from 'react-slick';
import { Link } from 'react-router';
import __ from 'lodash';

export default class SliderMostShared extends PureComponent {
  static propTypes = {
    featuredParks: PropTypes.shape({
      parks: PropTypes.array
    }).isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate() { }

  componentWillUnmount() { }

  getParks() {
    return this.props.featuredParks.parks || [];
  }

  imgError(evt) {
    console.log('EVT: ', evt.target);
  }

  makeSlides() {
    // sort slides based on count
    const slides = __.slice(this.getParks());
    slides.sort((a, b) => {
      return +b.count - +a.count;
    });

    return slides.map((park) => {
      return (
        <div key={park.su_id} className='slide-container'>
          <Link to={`/park/${park.su_id}`}>
            <div className='overlay'><p className='place'>{park.su_name}</p></div>
            <img src={park.standard_resolution} onError={this.imgError}/>
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
      slidesToShow: 4,
      variableWidth: true,
      slidesToScroll: 3,
      initialSlide: 0
    };

    // <Slider {...settings}>
    return (
      <div className='home-slider-wrap'>
        <div ref='slide-recent' className='slider-recent'>
          <Slider {...settings}>
            {this.makeSlides()}
          </Slider>
        </div>
      </div>
    );
  }

}
