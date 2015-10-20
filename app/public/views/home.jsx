import React, {PropTypes} from 'react';
import api from '../../services/xhr.js';
import SliderBase  from '../components/sliderBase.jsx';

class Home extends React.Component {

  static propTypes = {
    viewdata: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]).isRequired
  };

  state = {
    parks: []
  };

  constructor(props) {
    super(props);

    const data = this.props.viewdata;
    if (data.parks || data.parks.length > 0) {
      this.state = {parks: data.parks};
    }
  }

  componentDidMount() {
    const that = this;
    const data = this.props.viewdata;
    if (!data.parks || data.parks.length === 0) {
      api.get('parks', {}).then((data) => {
        that.setState({parks: data});
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
    }
  }

  componentDidUpdate() { }

  componentWillUnmount() { }

  render() {
    return (
      <div className='home-slider-wrap'>
        <SliderBase
          images={this.state.parks}
          propKey='standard_resolution'
          klass='slider-recent'
          overlay={true}
          settings={{
            dots: false,
            infinite: true,
            speed: 500,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            variableWidth: true}}
        />
      </div>
    );
  }

}

export default Home;
