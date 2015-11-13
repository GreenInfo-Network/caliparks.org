import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import {GoogleMap, Marker} from 'react-google-maps';
import CustomTileLayer from '../components/customTileLayer';
import GmapDataLayer from  '../components/gmapDataLayer';
import GmapControls from './gmapControls';

export default class ParkMap extends PureComponent {
  static propTypes = {
    markers: PropTypes.array,
    geometry: PropTypes.object,
    selectedMarker: PropTypes.number,
    setMarkerIcon: PropTypes.func,
    setMarkerId: PropTypes.func,
    setMarkerPosition: PropTypes.func,
    setMarkerZindex: PropTypes.func
  };

  componentDidMount() {}

  componentDidUpdate() {}

  getMarkerIcon(marker, index) {
    if (typeof this.props.setMarkerIcon === 'function') {
      return this.props.setMarkerIcon(marker, index);
    }

    return null;
  }

  getMarkerId(marker, index) {
    if (typeof this.props.setMarkerId === 'function') {
      return this.props.setMarkerId(marker, index);
    }

    return index;
  }

  getMarkerPosition(marker, index) {
    if (typeof this.props.setMarkerPosition === 'function') {
      return this.props.setMarkerPosition(marker, index);
    }

    if (marker.lat && marker.lng) return {lat:marker.lat, lng:marker.lng};

    return {lat:0, lng:0};
  }

  getMarkerZindex(marker, index) {
    if (typeof this.props.setMarkerZindex === 'function') {
      return this.props.setMarkerZindex(marker, index);
    }

    return (this.props.selectedMarker === index) ? 1000 + index : index;
  }

  render() {
    return (
      <GoogleMap ref='map' containerProps={{
        style: {
          height: '100%',
        },
      }}
        defaultZoom={6}
        defaultOptions={{
          streetViewControl: false,
          scrollwheel: false,
          mapTypeControl: false,
          zoomControl: false
        }}
        defaultCenter={{lat: 37.735969, lng: -121.640625}} >
        <CustomTileLayer tileUrl='http://{s}.map.parks.stamen.com/{z}/{x}/{y}{r}.png' {...this.props} />
        <GmapControls {...this.props} />

        {this.props.geometry &&
          <GmapDataLayer geometry={this.props.geometry} />
        }

        {this.props.markers.map((marker, index) => {
          const id = this.getMarkerId(marker, index);
          return (<Marker
            ref={id}
            key={id}
            icon={this.getMarkerIcon(marker, index)}
            zIndex={this.getMarkerZindex(marker, index)}
            position={this.getMarkerPosition(marker, index)} />
          );
        })}
      </GoogleMap>
    );
  }
}
