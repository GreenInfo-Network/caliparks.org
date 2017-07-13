import {
  default as React,
  PropTypes,
  Component
} from 'react';

import {
  default as canUseDOM,
} from 'can-use-dom';

import {default as GoogleMapHolder} from 'react-google-maps/lib/creators/GoogleMapHolder';

export default class GmapControls extends Component {

  static propTypes = {
    mapHolderRef: PropTypes.instanceOf(GoogleMapHolder)
  };

  static defaultProps = {
    mapHolderRef: null,
    tileUrl: null,
    subdomains: ['a', 'b', 'c', 'd'],
    tileSize: 256
  };

  state = {};

  componentWillMount() {
    if (!canUseDOM) {
      return;
    }
  }

  componentDidMount() {
    if (this.props.mapHolderRef) {
      const map = this.props.mapHolderRef.getMap();

      const centerControlDiv = document.createElement('div');
      centerControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.centerControl(centerControlDiv, map));

      const creditsControlDiv = document.createElement('div');
      creditsControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(this.creditsControl(creditsControlDiv));
    }
  }

  componentDidUpdate(prevProps) {}

  componentWillUnmount() {}

  creditsControl(controlDiv) {
    const controlUI = document.createElement('div');
    controlUI.className = 'credits-control-container';
    controlDiv.appendChild(controlUI);
    controlUI.innerHTML = '<span>Parks data by <a target="_blank" href="http://www.greeninfo.org/">GreenInfo Network</a><br/>Other data &copy; <a target="_blank" href="https://www.openstreetmap.org/">OpenStreetMap</a></span>';

    google.maps.event.addDomListener(controlUI, 'click', function() {
      controlUI.classList.toggle('credits-control-expanded');
    });

    return controlUI;
  }

  centerControl(controlDiv, map) {
    // Set CSS for the control border.
    const controlUI = document.createElement('div');
    controlUI.className = 'zoom-control-container';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    const zoomIn = document.createElement('div');
    zoomIn.className = 'zoom-in';
    zoomIn.innerHTML = '+';
    controlUI.appendChild(zoomIn);

    // divider
    const divider = document.createElement('div');
    divider.className = 'divider';
    controlUI.appendChild(divider);

    const zoomOut = document.createElement('div');
    zoomOut.className = 'zoom-out';
    zoomOut.innerHTML = '–';
    controlUI.appendChild(zoomOut);

    google.maps.event.addDomListener(zoomIn, 'click', function() {
      map.setZoom(map.getZoom() + 1);
    });

    google.maps.event.addDomListener(zoomOut, 'click', function() {
      map.setZoom(map.getZoom() - 1);
    });

    return controlUI;
  }

  render() {
    return (<noscript />);
  }
}
