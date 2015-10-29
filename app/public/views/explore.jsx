import React, {PropTypes} from 'react';
import SubView from '../components/subView';
import GoogleMap from 'google-map-react';
// import api from '../../services/xhr.js';

class Explore extends React.Component {

  static propTypes = {
    viewdata: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]).isRequired
  };

  componentDidMount() {
    /*
    const data = this.props.payload.viewdata;
    if (!data.stories || data.stories.length === 0) {
      api.get('stories', {}).then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
    }
    */
  }

  render() {
    return (
      <SubView>
        <div className='col-six'>
          <h1>Explore</h1>
        </div>
        <div className='col-ten height-full'>
          <GoogleMap
            defaultCenter={{lat: 37.735969, lng: -121.640625}}
            defaultZoom={6} />
        </div>
      </SubView>
    );
  }

}

export default Explore;

