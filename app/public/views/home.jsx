import React, {PropTypes} from 'react';
import api from '../../services/xhr.js';
import Slider from 'react-slick';
import { Link } from 'react-router';

class Home extends React.Component {

  static propTypes = {
    payload: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const data = this.props.payload.viewdata;
    if (data.parks && data.parks.length > 0) {
      this.state = {parks: data.parks};
    }
  }

  state = {
    parks: []
  };

  componentDidMount() {
    const that = this;
    const parks = this.state.parks;

    if (parks.length === 0) {
      api.get('parks', {}).then((data) => {
        console.log(data);
        that.setState({parks: data});
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
    }
  }

  componentDidUpdate() { }

  componentWillUnmount() { }

  imgError(evt) {
    console.log('EVT: ', evt.target);
  }

  makeSlides() {
    const that = this;
    return this.state.parks.map((row, idx) => {
      return (
        <div key={idx} className='slide-container'>
          <Link to={`/park/${row.su_id}`}>
            <div className='overlay'><p className='place'>{row.su_name}</p></div>
            <img src={row.standard_resolution} onError={that.imgError}/>
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

export default Home;
