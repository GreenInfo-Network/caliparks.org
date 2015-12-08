import {
  default as React,
  PropTypes,
  Component
} from 'react';

import {
  default as canUseDOM,
} from 'can-use-dom';

import {Marker} from 'react-google-maps';
import {default as GoogleMapHolder} from 'react-google-maps/lib/creators/GoogleMapHolder';
import {default as MarkerClusterer} from 'react-google-maps/lib/addons/MarkerClusterer';

export default class GmapMarkerClusterer extends Component {

  static propTypes = {
    markers: PropTypes.array,
    selectedMarker: React.PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    setMarkerIcon: PropTypes.func,
    setMarkerId: PropTypes.func,
    setMarkerPosition: PropTypes.func,
    setMarkerZindex: PropTypes.func,
    onMarkerClick: PropTypes.func,
    cluster: PropTypes.bool,
    mapHolderRef: PropTypes.instanceOf(GoogleMapHolder)
  };

  static defaultProps = {
    markers: null
  };

  componentWillMount() {
    if (!canUseDOM) {
      return;
    }
  }

  componentDidMount() {}

  shouldComponentUpdate(nextProps) {
    let update = false;
    if (nextProps.markers !== this.props.markers) {
      update = true;
    }

    if (nextProps.selectedMarker !== this.props.selectedMarker) {
      update = true;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (this.props.setCenterTo !== prevProps.setCenterTo && this.props.setCenterTo && this.props.mapHolderRef) {
      const map = this.props.mapHolderRef.getMap();
      map.setCenter(this.props.setCenterTo);
    }
  }

  componentWillUnmount() {}


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

  onMarkerClick(marker, idx) {
    if (typeof this.props.onMarkerClick === 'function') {
      this.props.onMarkerClick(marker, idx);
    }
  }

  getMarkers() {
    return this.props.markers.map((marker, index) => {
      const id = this.getMarkerId(marker, index);
      return (<Marker
        mapHolderRef={this.props.mapHolderRef}
        ref={id}
        key={id}
        icon={this.getMarkerIcon(marker, index)}
        zIndex={this.getMarkerZindex(marker, index)}
        position={this.getMarkerPosition(marker, index)}
        onClick={this.onMarkerClick.bind(this, marker, index)} />
      );
    });
  }

  renderMarkers() {
    if (!this.props.mapHolderRef) return [];

    if (this.props.cluster) {
      const clusterStyles = [
        {
          textColor: 'white',
          url: '/assets/svgs/icon-cluster-small.svg',
          height: 20,
          width: 20
        },
        {
          textColor: 'white',
          url: '/assets/svgs/icon-cluster-med.svg',
          height: 30,
          width: 30
        },
        {
          textColor: 'white',
          url: '/assets/svgs/icon-cluster-large.svg',
          height: 40,
          width: 40
        }
      ];
      return (
        <MarkerClusterer
          mapHolderRef={this.props.mapHolderRef}
          averageCenter={ true }
          enableRetinaIcons={ false }
          styles={clusterStyles}
          minimumClusterSize={4}
          batchSize={1000}
          batchSizeIE={200}
          maxZoom={12}
          gridSize={ 60 }>
          {this.getMarkers()}
        </MarkerClusterer>
      );
    }

    return (
      <div style={{display: 'none'}}>
        {this.getMarkers()}
      </div>
    );
  }

  render() {
    return this.renderMarkers();
  }
}
