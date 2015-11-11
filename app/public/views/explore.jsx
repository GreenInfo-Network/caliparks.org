import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import Dropdown from 'react-select';
// import GoogleMap from 'google-map-react';
import {GoogleMap, Marker} from 'react-google-maps';
import CustomTileLayer from '../components/customTileLayer';
import Navigator from '../components/navigator';

export default class Explore extends PureComponent {
  static propTypes = {
    height: PropTypes.number,
    handleOnChange: PropTypes.func,
    mostSharedParks: PropTypes.shape({
      parks: PropTypes.array
    }).isRequired
  };


  componentDidMount() {}

  componentDidUpdate() {}

  getHeight() {
    return this.props.height || 700;
  }

  logChange(val) {
    if (typeof this.props.handleOnChange === 'function') {
      this.props.handleOnChange(val);
    }
  }

  render() {
    /*
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'season-now', label: 'This season' },
    { value: 'season-last', label: 'Last season' },
     */
    const options = [
      { value: 'week-now', label: 'This week' },
      { value: 'week-last', label: 'Last week' },
      { value: 'month-now', label: 'This month' },
      { value: 'month-last', label: 'Last month' },
      { value: 'year-now', label: 'This year' },
      { value: 'year-last', label: 'Last year' }
    ];

    // http://complexdan.com/svg-circleellipse-to-path-converter/
    const sym = {
      path: 'M-8,0a8,8 0 1,0 16,0a8,8 0 1,0 -16,0',
      scale: 1,
      fillColor: '#358292',
      fillOpacity: 1,
      strokeOpacity: 0
    };

    console.log('FETCHING: ', this.props.mostSharedParks.parks);
    return (
      <div id='explore' name='explore' className='row theme-white' style={{height: this.getHeight() + 'px'}}>
        <div className='col-four'>
          <div className='center-align-container'>
            <h4 className='uppercase'>Explore</h4>
            <p className='description'>Photos pour out of our parks daily. See what’s happening and where.</p>

            <div className='dropdown-filter'>
              <p className='label uppercase'>Showing top 10 parks</p>
              <Dropdown
                className='dropdown'
                name='park-top-ten-picker'
                value='week-now'
                options={options}
                clearable={false}
                onChange={this.logChange.bind(this)} />
            </div>
          </div>
        </div>
        <div className='col-eight'>
          {this.props.mostSharedParks.isFetching &&
            <div className='loading-data'><h3>Loading</h3></div>
          }
          <Navigator items={this.props.mostSharedParks.parks} nameKey={'unit_name'}/>
          <GoogleMap containerProps={{
            style: {
              height: '100%',
            },
          }}
            defaultZoom={6}
            options={{
              streetViewControl: false,
              scrollwheel: false,
              mapTypeControl: false
            }}
            defaultCenter={{lat: 37.735969, lng: -121.640625}}
          >
            <CustomTileLayer tileUrl='http://{s}.map.parks.stamen.com/{z}/{x}/{y}{r}.png' {...this.props} />
            {this.props.mostSharedParks.parks.map((marker, index) => {
              const coords = marker.centroid.coordinates;
              return <Marker key={marker.superunit_id} icon={sym} position={{lat:coords[1], lng:coords[0]}} />;
            })}
          </GoogleMap>
        </div>
      </div>
    );
  }
}

/*
<GoogleMap
  center={{lat: 37.735969, lng: -121.640625}}
  zoom={6}
  options = {{
    scrollwheel: false
  }}>
    <ParkLocation lat={32.9953804} lng={-116.7560043} text={'A'} />
  </GoogleMap>
*/

export class ParkLocation extends PureComponent {
  static propTypes = {
    text: PropTypes.string
  };

  constructor(props) {
    super(props);
  }
  render() {
    const style = {
      // initially any map object has left top corner at lat lng coordinates
      // it's on you to set object origin to 0,0 coordinates
      position: 'absolute',
      width: 20,
      height: 20,
      left: -20 / 2,
      top: -20 / 2,

      border: '5px solid #f44336',
      borderRadius: 20,
      backgroundColor: 'white',
      textAlign: 'center',
      color: '#3f51b5',
      fontSize: 16,
      fontWeight: 'bold',
      padding: 4
    };
    return (
      <div style={style}>
        {this.props.text}
      </div>
    );
  }
}
