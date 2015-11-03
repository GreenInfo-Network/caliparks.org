import React, {PropTypes} from 'react';
import api from '../../services/xhr';
import Slider from 'react-slick';
import { Link } from 'react-router';

export default class Home extends React.Component {
  static propTypes = {
    viewData: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state.parks = this.props.viewData.parks || [];
  }

  state = {
    parks: []
  }

  componentDidMount() {
    if (this.state.parks.length === 0) {
      api.get('parks', {}).then((parks) => {
        console.log('park data:', parks);

        if (this.mounted()) {
          this.setState({
            parks
          });
        }
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
    return this.state.parks.map((row, idx) => {
      return (
        <div key={idx} className='slide-container'>
          <Link to={`/park/${row.su_id}`}>
            <div className='overlay'><p className='place'>{row.su_name}</p></div>
            <img src={row.standard_resolution} onError={this.imgError}/>
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
