import {
  default as React,
  PropTypes,
  Component
} from 'react';

import {
  default as canUseDOM,
} from 'can-use-dom';

import {default as GoogleMapHolder} from 'react-google-maps/lib/creators/GoogleMapHolder';
import {geojsonStyles} from '../../constants/map';

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

  componentDidUpdate(prevProps) {
    if (this.props.geometry !== prevProps.geometry) {
      this.removeGeoJson();
      this.addGeoJson();
    }
  }

  componentWillUnmount() {
    if (this.props.mapHolderRef) {
      this.removeGeoJson();
    }
  }

  removeGeoJson() {
    if (this.props.mapHolderRef) {
      const map = this.props.mapHolderRef.getMap();
      map.data.forEach((feature) => {
        map.data.remove(feature);
      });
    }
  }

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
      map.data.setStyle(geojsonStyles);

      this.zoom(map);
    }
  }

  getBoundsZoomLevel(bounds, mapDim) {
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 21;

    function latRad(lat) {
      const sin = Math.sin(lat * Math.PI / 180);
      const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
      return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;
    const lngDiff = ne.lng() - sw.lng();
    const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
    const latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    const lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
  }

  zoom(map) {
    const bounds = new google.maps.LatLngBounds();
    map.data.forEach((feature) => {
      this.processPoints(feature.getGeometry(), bounds.extend, bounds);
    });

    if (!bounds.isEmpty()) {
      const div = map.getDiv();
      window.google.maps.event.trigger(map, 'resize');
      const minZoomNeeded = this.getBoundsZoomLevel(bounds, {width: div.offsetWidth, height: div.offsetHeight});
      // map.fitBounds(bounds);
      map.setCenter(bounds.getCenter());
      map.setZoom(minZoomNeeded + 1);
      console.log('ZOOM : ', map.getZoom());
    }
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
