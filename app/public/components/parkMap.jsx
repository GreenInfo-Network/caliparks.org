import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import PureComponent from 'react-pure-render/component';
import {GoogleMap} from 'react-google-maps';
import CustomTileLayer from '../components/customTileLayer';
import GmapDataLayer from  '../components/gmapDataLayer';
import GmapControls from './gmapControls';
import GmapMarkerClusterer from './gmapMarkerClusterer';
import ParkSearch from '../components/parkSearch';
import LocateMe from '../components/locateMe';
import RefineButton from '../components/refineBtn';
import {debounce} from 'lodash';
import request from 'superagent';
import {envelope2Bounds} from '../../constants/map';

export default class ParkMap extends PureComponent {
  static propTypes = {
    geometry: PropTypes.object,
    shouldResize: PropTypes.bool,
    onBoundsChange: PropTypes.func,
    useSearch: PropTypes.bool,
    useLocateMe: PropTypes.bool,
    useRefineButton: PropTypes.bool,
    onSearchSelect: PropTypes.func,
    autoBounds: PropTypes.bool,
    useLocalData: PropTypes.bool,
    localSearchData: PropTypes.array,
    searchEndPoint: PropTypes.string
  };

  static defaultProps = {
    useSearch: false,
    useLocateMe: false,
    useRefineButton: false,
    autoBounds: false,
    useLocalData: false
  };

  componentWillMount() {
    this.handleBoundsChangeDebounced = debounce(this.handleAutoBoundsChange, 500).bind(this);
  }

  componentDidMount() {
    this.resizeMap();
  }

  componentWillReceiveProps(nextProps) {
    const {shouldZoomToID, selectedMarker} = nextProps;
    if (shouldZoomToID) {
      this.zoomToParkBounds(selectedMarker);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.shouldResize) this.resizeMap();
  }

  getMap() {
    let map = null;
    try {
      map = this.refs.map.refs.delegate.props.map;
    } catch (e) {
      console.log('Could not find map reference...');
    }

    return map;
  }

  resizeMap() {
    if (this.refs.map &&
      typeof window !== 'undefined'
    ) {
      const map = ReactDOM.findDOMNode(this.refs.map);
      window.google.maps.event.trigger(map, 'resize');
    }
  }

  getSelectedCoordinates() {
    const sel = this.props.markers.filter((m) => {
      return this.props.selectedMarker === m.photoid;
    });

    if (sel.length) {
      const coords = this.props.setMarkerPosition(sel[0]);
      return coords;
    }

    return null;
  }

  handleAutoBoundsChange = () => {
    const {autoBounds} = this.props;
    if (!autoBounds) return;
    this.handleBoundsChange();
  };

  handleBoundsChange() {
    if (typeof this.props.onBoundsChange === 'function') {
      const bds = this.refs.map.getBounds();
      if (!bds || bds.isEmpty()) return;

      const ne = bds.getNorthEast();
      const sw = bds.getSouthWest();

      if (ne.equals(sw)) return;

      if (this._prevBounds && bds.equals(this._prevBounds)) return;
      this._prevBounds = bds;

      this.props.onBoundsChange(bds.toUrlValue(4).split(','), bds);
    }
  }

  zoomToParkBounds(id) {
    request
      .get('/api/park/' + id + '/bounds')
      .end((err, res) => {
        if (err) {
          console.error('Failed to get park bounds');
        } else {
          const data = JSON.parse(res.text);
          const map = this.getMap();

          const bds = envelope2Bounds(data[0].bbox.coordinates[0]);
          if (!bds.isEmpty() || !map) {
            const zoom = this.refs.map.getZoom();
            const center = this.refs.map.getCenter();

            google.maps.event.addListenerOnce(map, 'idle', () => {
              const newBounds = this.refs.map.getBounds();
              if (typeof this.props.onBoundsChange === 'function') {
                this.props.onBoundsChange(newBounds.toUrlValue(4).split(','), 14);
              }
            });

            if (zoom >= 10) {
              this.refs.map.panTo(bds.getCenter());
            } else {
              this.refs.map.fitBounds(bds);
            }
          }
        }
      });
  }

  onSearchSelect = (id) => {
    const {onSearchSelect} = this.props;
    if (typeof onSearchSelect === 'function') {
      // this.zoomToParkBounds(id);
      this.searchId = id;
      onSearchSelect(id);
    }
  };

  onPosition = (loc) => {
    if (loc && loc.length === 2 && this.refs.map) {
      const zoom = this.refs.map.getZoom();
      const map = this.getMap();

      if (map) {
        map.setCenter({lat: loc[0], lng: loc[1]});
        if (zoom < 13) map.setZoom(13);
      }
    }
  };

  refineClick = () => {
    const {autoBounds} = this.props;

    // If auto bounds active, don't manually
    // update bounds
    if (autoBounds) return;

    this.handleBoundsChange();
  };

  render() {
    const {useSearch, useRefineButton, useLocateMe} = this.props;
    const hasGeometry = this.props.geometry !== null ? true : false;
    const resetSearchValue = (this.searchId && (this.searchId !== this.props.selectedMarker)) ? true : false;
    if (resetSearchValue) this.searchId = null;
    const setCenterTo = this.getSelectedCoordinates();

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
        defaultCenter={{lat: 37.735969, lng: -121.640625}}
        onBoundsChanged={this.handleBoundsChangeDebounced}>
        <CustomTileLayer tileUrl='http://{s}.map.parks.stamen.com/{z}/{x}/{y}{r}.png' {...this.props} />
        <GmapControls {...this.props} />

        {hasGeometry &&
          <GmapDataLayer geometry={this.props.geometry} setCenterTo={setCenterTo} />
        }

        <GmapMarkerClusterer {...this.props} setCenterTo={setCenterTo} />

        {useSearch &&
          <ParkSearch
            resetSearchValue={resetSearchValue}
            localData={this.props.localSearchData}
            useLocalData={this.props.useLocalData}
            onSearchSelect={this.onSearchSelect}
            endPoint={this.props.searchEndPoint} />
        }

        {useLocateMe &&
          <LocateMe onPosition={this.onPosition} restrictWith='/assets/data/california.geojson'/>
        }

        {useRefineButton &&
          <RefineButton onClickHandler={this.refineClick}/>
        }
      </GoogleMap>
    );
  }
}
