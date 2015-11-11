import {
  default as React,
  PropTypes,
  Component
} from 'react';

import {
  default as canUseDOM,
} from 'can-use-dom';

import {default as GoogleMapHolder} from 'react-google-maps/lib/creators/GoogleMapHolder';

export default class GmapDataLayer extends Component {

  static propTypes = {
    mapHolderRef: PropTypes.instanceOf(GoogleMapHolder),
    geometry: PropTypes.object

  }

  static defaultProps = {
    mapHolderRef: null,
    geometry: null
  };

  componentWillMount() {
    if (!canUseDOM) {
      return;
    }
  }

  componentDidMount() {
    this.addGeoJson();
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {}

  addGeoJson() {
    if (this.props.mapHolderRef && this.props.geometry) {
      const map = this.props.mapHolderRef.getMap();

      // TODO: fix format problem
      const tempObject = {
        'type': 'FeatureCollection',
        'features': []
      };

      tempObject.features.push({
        type: 'Feature',
        properties: {},
        geometry: {
          type: this.props.geometry.type,
          coordinates: this.props.geometry.coordinates
        }
      });
      map.data.addGeoJson(tempObject);
      map.data.setStyle({
        fillColor: '#358292',
        strokeWeight: 0
      });
      this.zoom(map);
    }
  }

  zoom(map) {
    const bounds = new google.maps.LatLngBounds();
    map.data.forEach((feature) => {
      this.processPoints(feature.getGeometry(), bounds.extend, bounds);
    });
    map.fitBounds(bounds);
  }

  processPoints(geometry, callback, thisArg) {
    if (geometry instanceof google.maps.LatLng) {
      callback.call(thisArg, geometry);
    } else if (geometry instanceof google.maps.Data.Point) {
      callback.call(thisArg, geometry.get());
    } else {
      geometry.getArray().forEach((g) => {
        this.processPoints(g, callback, thisArg);
      });
    }
  }

  render() {
    return (<noscript />);
  }
}
