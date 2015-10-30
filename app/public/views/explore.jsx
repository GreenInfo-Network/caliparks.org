import React, {PropTypes} from 'react';
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
    // see home.jsx to see how to load data via XHR
  }

  render() {
    return (
      <div id='explore' className='row theme-white'>
        <div className='col-six'>
          <h1>Explore</h1>
        </div>
        <div className='col-ten'>
          <GoogleMap
            center={{lat: 37.735969, lng: -121.640625}}
            zoom={6}
            options = {{
              scrollwheel: false
            }} />
        </div>
      </div>
    );
  }

}

export default Explore;

