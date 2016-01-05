import {
  default as React,
  PropTypes,
  Component
} from 'react';

import {
  default as canUseDOM,
} from 'can-use-dom';

import {default as GoogleMapHolder} from 'react-google-maps/lib/creators/GoogleMapHolder';

export default class CustomTileLayer extends Component {

  static propTypes = {
    mapHolderRef: PropTypes.instanceOf(GoogleMapHolder),
    subdomains: PropTypes.array,
    tileUrl: PropTypes.string.isRequired,
    tileSize: PropTypes.number,
  };

  static defaultProps = {
    mapHolderRef: null,
    tileUrl: null,
    subdomains: ['a', 'b', 'c', 'd'],
    tileSize: 256
  };

  state = {}

  componentWillMount() {
    if (!canUseDOM) {
      return;
    }
    const that = this;

    const isRetina = (
      window.devicePixelRatio > 1 ||
      (window.matchMedia && window.matchMedia('(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)').matches)
    );

    const retinaPrefix = (isRetina) ? '@2x' : '';

    const tl = new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        return that.props.tileUrl.replace('{s}', 'a').replace('{z}', zoom).replace('{x}', coord.x).replace('{y}', coord.y).replace('{r}', retinaPrefix);
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 18,
      minZoom: 1,
      name: 'parks'
    });

    this.setState({ tileLayer: tl });
  }

  componentDidMount() {
    if (!this.state.tileLayer) return;
    if (this.props.mapHolderRef) {
      const map = this.props.mapHolderRef.getMap();
      map.mapTypes.set('park', this.state.tileLayer);
      map.setMapTypeId('park');
    }
  }

  componentDidUpdate(prevProps) {}

  componentWillUnmount() {}

  render() {
    return (<noscript />);
  }
}
