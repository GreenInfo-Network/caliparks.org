import React from 'react';
import Slider from '../components/Slider.jsx';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className='home-slider-wrap'>
        <Slider
          images={this.props.viewdata.recentParks}
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
