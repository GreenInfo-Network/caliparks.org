import React from 'react';
import PureComponent from 'react-pure-render/component';
import {GoogleMap, Polygon} from 'react-google-maps';
import CustomTileLayer from '../components/customTileLayer';
import GmapDataLayer from  '../components/gmapDataLayer';

export default class ParkMap extends PureComponent {

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const triangleCoords = [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757},
      {lat: 25.774, lng: -80.190}
    ];

    const poly = {
      paths: triangleCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    };

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
          <Polygon {...poly} />
          <GmapDataLayer geometry={this.props.selectedPark.park[0].geometry} />
        </GoogleMap>
    );
  }
}
