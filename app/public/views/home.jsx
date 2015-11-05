import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import Slider from 'react-slick';
import { Link } from 'react-router';

export default class Home extends PureComponent {
  static propTypes = {
    parks: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }

  getParks() {
    return this.props.parks || [];
  }

  componentDidMount() {
  }

  componentDidUpdate() { }

  componentWillUnmount() { }

  imgError(evt) {
    console.log('EVT: ', evt.target);
  }

  makeSlides() {
    return this.getParks().map((park, idx) => {
      return (
        <div key={idx} className='slide-container'>
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
      slidesToScroll: 3
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
