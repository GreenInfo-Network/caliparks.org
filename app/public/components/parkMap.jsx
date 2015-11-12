import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import {GoogleMap, Marker} from 'react-google-maps';
import CustomTileLayer from '../components/customTileLayer';
import GmapDataLayer from  '../components/gmapDataLayer';

export default class ParkMap extends PureComponent {
  static propTypes = {
    park: PropTypes.object,
    selectedMarker: PropTypes.number
  };

  componentDidMount() {}

  componentDidUpdate() {}

  getMarkerIcon(idx) {
    if (idx === this.props.selectedMarker) return '/assets/svgs/icon-instagram.svg';
    return '/assets/svgs/icon-square-4px.svg';
  }

  render() {
    return (
      <GoogleMap ref='map' containerProps={{
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
        defaultCenter={{lat: 37.735969, lng: -121.640625}} >
        <CustomTileLayer tileUrl='http://{s}.map.parks.stamen.com/{z}/{x}/{y}{r}.png' {...this.props} />
        {this.props.park.park.length &&
          <GmapDataLayer geometry={this.props.park.park[0].geometry} />
        }

        {this.props.park.images.map((marker, index) => {
          const zidx = (this.props.selectedMarker === index) ? 1000 + index : index;
          return (<Marker
            ref={marker.photoid}
            key={marker.photoid}
            icon={this.getMarkerIcon(index)}
            zIndex={zidx}
            position={{lat:marker.lat, lng:marker.lng}} />
          );
        })}
      </GoogleMap>
    );
  }
}
