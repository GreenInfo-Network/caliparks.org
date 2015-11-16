import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import Dropdown from 'react-select';

import {GoogleMap, Marker} from 'react-google-maps';
import CustomTileLayer from '../components/customTileLayer';
import GmapControls from '../components/gmapControls';
import Navigator from '../components/navigator';

export default class Explore extends PureComponent {
  static propTypes = {
    height: PropTypes.number,
    handleOnChange: PropTypes.func,
    mostSharedParks: PropTypes.shape({
      parks: PropTypes.array,
      interval: PropTypes.string,
      isFetching: PropTypes.bool
    }).isRequired,
    handleMarkerClick: PropTypes.func
  };

  state = {
    selectedMarker: 0
  }

  componentDidMount() {}

  componentDidUpdate() {}

  onMarkerClick(item) {
    if (typeof this.props.handleMarkerClick === 'function') {
      this.props.handleMarkerClick(item.superunit_id);
    }
  }

  onNavigatorChange(dir) {
    const length = this.props.mostSharedParks.parks.length - 1;
    const idx = this.state.selectedMarker;
    if (dir === 'prev') {
      if (idx > 0) this.setState({selectedMarker: idx - 1});
    } else {
      if (idx < length) this.setState({selectedMarker: idx + 1});
    }
  }

  onDropdownChange(val) {
    if (typeof this.props.handleOnChange === 'function') {
      this.props.handleOnChange(val);
    }
  }

  getHeight() {
    return this.props.height || 700;
  }

  getMarkerIcon(idx) {
    // circle icon path generator:
    // http://complexdan.com/svg-circleellipse-to-path-converter/
    const icon = {
      scale: 1,
      fillOpacity: 1,
      strokeOpacity: 1
    };

    if (idx === this.state.selectedMarker) {
      icon.path = 'M-4,0a4,4 0 1,0 8,0a4,4 0 1,0 -8,0';
      icon.fillColor = '#ffffff';
      icon.strokeColor = '#358292';
      icon.strokeWeight = 2;
    } else {
      icon.path = 'M-5,0a5,5 0 1,0 10,0a5,5 0 1,0 -10,0';
      icon.fillColor = '#358292';
      icon.strokeColor = '#358292';
      icon.strokeWeight = 0;
    }
    return icon;
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

    return (
      <div id='explore-section' className='row theme-white' style={{height: this.getHeight() + 'px'}}>
        <div className='col-four'>
          <div className='center-align-container'>
            <h4 className='uppercase'>Explore</h4>
            <p className='description'>Photos pour out of our parks daily. See what’s happening and where.</p>

            <div className='dropdown-filter'>
              <p className='label uppercase'>Showing top 10 parks</p>
              <Dropdown
                className='dropdown'
                name='park-top-ten-picker'
                value={this.props.mostSharedParks.interval || 'week-now'}
                options={options}
                clearable={false}
                onChange={this.onDropdownChange.bind(this)} />
            </div>
          </div>
        </div>
        <div className='col-eight'>
          {this.props.mostSharedParks.isFetching &&
            <div className='loading-data'><h3>Loading</h3></div>
          }
          <Navigator
            items={this.props.mostSharedParks.parks}
            selectedItem={this.state.selectedMarker}
            nameKey={'unit_name'}
            idKey={'superunit_id'}
            onChange={this.onNavigatorChange.bind(this)} />

          <GoogleMap containerProps={{
            style: {
              height: '100%',
            },
          }}
            defaultZoom={6}
            defaultCenter={{lat: 37.735969, lng: -121.640625}}
            defaultOptions={{
              streetViewControl: false,
              scrollwheel: false,
              mapTypeControl: false,
              zoomControl: false
            }}>
            <GmapControls {...this.props} />
            <CustomTileLayer tileUrl='http://{s}.map.parks.stamen.com/{z}/{x}/{y}{r}.png' {...this.props} />
            {this.props.mostSharedParks.parks.map((marker, index) => {
              const coords = marker.centroid.coordinates;
              return (<Marker
                key={marker.superunit_id}
                onClick={this.onMarkerClick.bind(this, marker)}
                icon={this.getMarkerIcon(index)}
                position={{lat:coords[1], lng:coords[0]}} />
              );
            })}
          </GoogleMap>
        </div>
      </div>
    );
  }
}
