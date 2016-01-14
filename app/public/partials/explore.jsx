import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import PureComponent from 'react-pure-render/component';
import {FormattedMessage, defineMessages} from 'react-intl';
import Dropdown from 'react-select';
import {debounce} from 'lodash';
import request from 'superagent';

import {GoogleMap, Marker} from 'react-google-maps';
import CustomTileLayer from '../components/customTileLayer';
import GmapControls from '../components/gmapControls';
import Navigator from '../components/navigator';
import ParkSearch from '../components/parkSearch';
import LocateMe from '../components/locateMe';
import RefineButton from '../components/refineBtn';

import {MOBILE_BREAKPOINT} from '../../constants/layout';
import {getTwoColumnWidthPercent} from '../../constants/layout';
import {envelope2Bounds} from '../../constants/map';

export default class Explore extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    handleOnChange: PropTypes.func,
    mostShared: PropTypes.shape({
      parks: PropTypes.array,
      interval: PropTypes.string,
      isFetching: PropTypes.bool
    }).isRequired,
    handleMarkerClick: PropTypes.func,
    boundsChange: PropTypes.func
  };

  state = {
    selectedMarker: 0,
    currentIndex: 0,
    searchFocused: false
  };

  componentWillMount() {
    this.configureDropdownOptions();
    this.onBoundsChangeDebounced = debounce(this.onBoundsChange, 500).bind(this);
    this.getFirstMarker(this.props.mostShared);
  }

  componentDidMount() {
    this.resizeSections();
  }

  componentWillReceiveProps(nextProps) {
    const {selectedMarker, currentIndex} = this.state;

    if (this.props.mostShared.interval !== nextProps.mostShared.interval) {
      this.getFirstMarker(nextProps.mostShared);
    } else if (nextProps.mostShared.parks.length && selectedMarker === 0) {
      this.getFirstMarker(nextProps.mostShared);
    } else if (selectedMarker > 0) {
      const newIndex = this.getMarkerIndex(selectedMarker, nextProps.mostShared.parks);
      if (newIndex !== currentIndex) {
        this.setSelectedMarker(selectedMarker, nextProps.mostShared.parks);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.width !== this.props.width ||
        prevProps.height !== this.props.height) {
      this.resizeMap();
    }
    this.resizeSections();
  }

  componentWillUnmount() {
    this.onBoundsChangeDebounced = null;
  }

  configureDropdownOptions() {
    /*
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'season-now', label: 'This season' },
    { value: 'season-last', label: 'Last season' },
     */
    const messages = defineMessages({
      weeknow: {
        id: 'week-now',
        defaultMessage: 'This week'
      },
      weeklast: {
        id: 'week-last',
        defaultMessage: 'Last week'
      },
      monthnow: {
        id: 'month-now',
        defaultMessage: 'This month'
      },
      monthlast: {
        id: 'month-last',
        defaultMessage: 'Last month'
      },
      yearnow: {
        id: 'year-now',
        defaultMessage: 'This year'
      },
      yearlast: {
        id: 'year-last',
        defaultMessage: 'Last year'
      }
    });

    this.dropdownOptions = [
      { value: 'week-now', label: <FormattedMessage {...messages.weeknow}/> },
      { value: 'week-last', label: <FormattedMessage {...messages.weeklast}/> },
      { value: 'month-now', label: <FormattedMessage {...messages.monthnow}/> },
      { value: 'month-last', label: <FormattedMessage {...messages.monthlast}/> },
      { value: 'year-now', label: <FormattedMessage {...messages.yearnow}/> },
      { value: 'year-last', label: <FormattedMessage {...messages.yearlast}/> }
    ];
  }

  // Expecting a sorted array
  getFirstMarker(mostShared) {
    if (!mostShared.parks.length) return;
    const id = mostShared.parks[0].su_id;

    this.setSelectedMarker(id, mostShared.parks);
  }

  getMarkerID(markerOrId) {
    return (markerOrId.su_id) ? markerOrId.su_id : markerOrId;
  }

  getMarkerIndex(markerOrId, parksArray) {
    const {mostShared} = this.props;
    const id = this.getMarkerID(markerOrId);
    let start = -1;

    const parks = parksArray || mostShared.parks;

    parks.forEach((pk, idx) => {
      if (pk.su_id === id) start = idx;
    });

    return start;
  }

  setSelectedMarker(markerOrId, parksArray) {
    const idx = this.getMarkerIndex(markerOrId, parksArray);
    const id = this.getMarkerID(markerOrId);
    if (idx > -1) {
      this.setState({selectedMarker: id, currentIndex: idx});
    } else {
      this.resetSelectedMarker();
    }
  }

  resetSelectedMarker() {
    this.setState({selectedMarker: 0, currentIndex: 0});
  }

  onMarkerClick(marker) {
    const {selectedMarker} = this.state;
    const id = this.getMarkerID(marker);

    if (selectedMarker === id) {
      location.href = '/park/' + id;
      return;
    }

    this.setSelectedMarker(marker);

    if (typeof this.props.handleMarkerClick === 'function') {
      this.props.handleMarkerClick(marker);
    }
  }

  onNavigatorChange(dir) {
    const {currentIndex} = this.state;
    const {mostShared} = this.props;
    const length = mostShared.parks.length - 1;
    const map = this.refs.map;

    let newIndex = currentIndex;
    if (dir === 'prev' && currentIndex > 0) {
      newIndex--;
    } else if (currentIndex < length) {
      newIndex++;
    }

    const marker = mostShared.parks[newIndex];
    if (marker && marker.su_id) {
      if (map && marker.centroid) {
        const bds = map.getBounds();
        const coord = new google.maps.LatLng(marker.centroid.coordinates[1], marker.centroid.coordinates[0]);
        if (!bds.contains(coord)) map.panTo(coord);
      }

      this.setState({selectedMarker: marker.su_id, currentIndex: newIndex});
    }
  }

  onDropdownChange(val) {
    if (typeof this.props.handleOnChange === 'function') {
      this.props.handleOnChange(val, this.refs.map.getZoom());
    }
  }

  onSearchSelect(id) {
    this.setState({selectedMarker: id});

    request
      .get('/api/park/' + id + '/bounds')
      .end((err, res) => {
        if (err) {
          console.error('Failed to get park bounds');
        } else {
          const data = JSON.parse(res.text);
          const bds = envelope2Bounds(data[0].bbox.coordinates[0]);
          const map = this.getMap();

          if (!bds.isEmpty() && map) {
            const zoom = this.refs.map.getZoom();

            google.maps.event.addListenerOnce(map, 'idle', () => {
              const newBounds = this.refs.map.getBounds();
              if (typeof this.props.boundsChange === 'function') {
                this.props.boundsChange(newBounds.toUrlValue(4).split(','), this.refs.map.getZoom());
              }
            });

            if (zoom >= 14) {
              this.refs.map.panTo(bds.getCenter());
            } else {
              this.refs.map.fitBounds(bds);
            }
          }
        }
      });
  }

  getHeight() {
    const h = this.props.height || 700;
    return h - 76;
  }

  resizeMap() {
    if (this.refs.map &&
      typeof window !== 'undefined'
    ) {
      const map = ReactDOM.findDOMNode(this.refs.map);
      window.google.maps.event.trigger(map, 'resize');
    }
  }

  resizeSections() {
    const {sideleft, sideright} = this.refs;
    if (sideleft && sideright) {
      if (this.props.width < MOBILE_BREAKPOINT) {
        const height = this.getHeight();

        sideleft.style.height = 'auto';

        const leftHeight = sideleft.offsetHeight + 20;

        sideleft.style.height = leftHeight + 'px';
        sideright.style.height = (height - leftHeight - 8 - 5) + 'px';
      } else {
        sideright.style.height = sideleft.style.height = '100%';
      }
    }
  }

  isMarkerNotATopTen() {
    const {currentIndex} = this.state;
    const {mostShared} = this.props;
    return (mostShared.parks[currentIndex] && mostShared.parks[currentIndex].other) ? true : false;
  }

  getMarkerIcon(marker) {
    const {selectedMarker} = this.state;
    // circle icon path generator:
    // http://complexdan.com/svg-circleellipse-to-path-converter/
    const icon = {
      scale: 1,
      fillOpacity: 1,
      strokeOpacity: 1
    };

    if (marker.su_id === selectedMarker) {
      icon.path = 'M-4,0a4,4 0 1,0 8,0a4,4 0 1,0 -8,0';
      icon.fillColor = '#ffffff';
      icon.strokeColor = '#358292';
      icon.strokeWeight = 2;
    } else {
      icon.path = 'M-5,0a5,5 0 1,0 10,0a5,5 0 1,0 -10,0';
      icon.fillColor = (!marker.other) ? '#358292' : '#999';
      icon.strokeColor = (!marker.other) ? '#358292' : '#fff';
      icon.strokeWeight = (!marker.other) ? 0 : 1;
    }

    return icon;
  }

  onBoundsChange() {
    if (typeof this.props.boundsChange === 'function') {
      const bounds = this.refs.map.getBounds().toUrlValue(4).split(',');
      this.props.boundsChange(bounds, this.refs.map.getZoom());
    }
  }

  getMap() {
    let map = null;
    try {
      map = this.refs.map.refs.delegate.props.map;
    } catch (e) {
      console.log('Could not find map...');
    }

    return map;
  }

  onPosition(loc) {
    if (loc && loc.length === 2 && this.refs.map) {
      const zoom = this.refs.map.getZoom();
      const map = this.getMap();

      if (map) {
        map.setCenter({lat: loc[0], lng: loc[1]});
        if (zoom < 13) map.setZoom(13);
      }
    }
  }

  refineClick() {
    this.onBoundsChange();
    // this.resetSelectedMarker();
  }

  searchOnFocus = () => {
    this.setState({searchFocused: true});
  };

  searchOnBlur = () => {
    this.setState({searchFocused: false});
  };

  searchSorter = (things) => {
    things.sort((a, b) => {
      const first = (a.name > b.name)
        ? 1
        : (a.name < b.name ? -1 : 0);

      const second = (a.size > b.size)
        ? -1
        : (a.size < b.size ? 1 : 0);

      return first === 0
              ? second
              : first;
    });

    return things;
  };

  render() {
    const [leftWidth, rightWidth] = getTwoColumnWidthPercent(this.props.width, 0);
    const searchClass = (this.state.searchFocused) ? ' search-on' : '';
    const hideTop = this.isMarkerNotATopTen();

    return (
      <div id='explore-section' className={'theme-white' + searchClass} style={{height: (this.getHeight() - 8) + 'px'}}>
        <div className='wrapper row height-full'>
          <div ref='sideleft' className='side-left col-four' style={{width: leftWidth + '%'}}>
            <div className='center-align-container'>
              <h4 className='uppercase'>
                <FormattedMessage
                  id='explore'
                  defaultMessage='Explore' />
              </h4>
              <p className='description'>
                <FormattedMessage
                  id='explore.section.message'
                  defaultMessage={`Photos pour out of our parks daily. See what's happening and where.`} />
              </p>

              <div className='dropdown-filter'>
                <p className='label uppercase'>
                <FormattedMessage
                    id='explore.section.dropdown.title'
                    defaultMessage={`Showing top 10 parks`} />
                </p>
                <Dropdown
                  className='dropdown'
                  name='park-top-ten-picker'
                  value={this.props.mostShared.interval || 'week-now'}
                  options={this.dropdownOptions}
                  clearable={false}
                  onChange={this.onDropdownChange.bind(this)} />
              </div>
            </div>
          </div>
          <div ref='sideright' className='side-right col-eight' style={{width: rightWidth + '%'}}>
            {this.props.mostShared.isFetching &&
              <div className='loading-data'>
                <h3>
                  <FormattedMessage
                      id='loading.parks'
                      defaultMessage={`Loading parks...`} />
                </h3>
              </div>
            }

            <ParkSearch
              onSearchSelect={this.onSearchSelect.bind(this)}
              onFocusHandler={this.searchOnFocus}
              onBlurHandler={this.searchOnBlur}
              endPoint='/api/search'
              sortHandler={this.searchSorter}/>
            <LocateMe onPosition={this.onPosition.bind(this)} restrictWith='/assets/data/california.geojson' />
            <RefineButton onClickHandler={this.refineClick.bind(this)} />

            <Navigator
              items={this.props.mostShared.parks}
              selectedItem={this.state.currentIndex}
              nameKey={'su_name'}
              idKey={'su_id'}
              hideTop={hideTop}
              onChange={this.onNavigatorChange.bind(this)} />

            <GoogleMap ref='map' containerProps={{
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
              }}
              >
              <GmapControls {...this.props} />
              <CustomTileLayer tileUrl='http://{s}.map.parks.stamen.com/{z}/{x}/{y}{r}.png' {...this.props} />
              {this.props.mostShared.parks.map((marker, index) => {
                const coords = marker.centroid.coordinates;
                return (<Marker
                  key={marker.su_id}
                  onClick={this.onMarkerClick.bind(this, marker)}
                  icon={this.getMarkerIcon(marker)}
                  position={{lat:coords[1], lng:coords[0]}} />
                );
              })}
            </GoogleMap>
          </div>
        </div>
        <div className='scroll-helper-arrow down dark'/>
      </div>
    );
  }
}
