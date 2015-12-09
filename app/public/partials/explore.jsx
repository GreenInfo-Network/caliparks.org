import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import PureComponent from 'react-pure-render/component';
import {FormattedMessage, defineMessages} from 'react-intl';
import Dropdown from 'react-select';
import {debounce} from 'lodash';

import {GoogleMap, Marker} from 'react-google-maps';
import CustomTileLayer from '../components/customTileLayer';
import GmapControls from '../components/gmapControls';
import Navigator from '../components/navigator';

import {getTwoColumnWidthPercent} from '../../constants/layout';

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
    selectedMarker: 0
  }

  componentWillMount() {
    this.configureDropdownOptions();
    this.onBoundsChangeDebounced = debounce(this.onBoundsChange, 500).bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.mostShared.interval !== nextProps.mostShared.interval) {
      this.setState({selectedMarker: 0});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.width !== this.props.width ||
        prevProps.height !== this.props.height) {
      this.resizeMap();
    }
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

  getMarkerIndex(marker) {
    let start = -1;
    this.props.mostShared.parks.forEach((pk, idx) => {
      if (pk.superunit_id === marker.superunit_id) start = idx;
    });

    return start;
  }

  onMarkerClick(marker) {
    const idx = this.getMarkerIndex(marker);
    if (idx > -1 && this.state.selectedMarker !== idx) {
      this.setState({selectedMarker: idx});
    }

    if (typeof this.props.handleMarkerClick === 'function') {
      this.props.handleMarkerClick(marker);
    }
  }

  onNavigatorChange(dir) {
    const length = this.props.mostShared.parks.length - 1;
    const idx = this.state.selectedMarker;
    if (dir === 'prev') {
      if (idx > 0) this.setState({selectedMarker: idx - 1});
    } else {
      if (idx < length) this.setState({selectedMarker: idx + 1});
    }
  }

  onDropdownChange(val) {
    if (typeof this.props.handleOnChange === 'function') {
      this.props.handleOnChange(val);
    }
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

  getMarkerIcon(idx) {
    // circle icon path generator:
    // http://complexdan.com/svg-circleellipse-to-path-converter/
    const icon = {
      scale: 1,
      fillOpacity: 1,
      strokeOpacity: 1
    };

    if (idx === this.state.selectedMarker) {
      icon.path = 'M-4,0a4,4 0 1,0 8,0a4,4 0 1,0 -8,0';
      icon.fillColor = '#ffffff';
      icon.strokeColor = '#358292';
      icon.strokeWeight = 2;
    } else {
      icon.path = 'M-5,0a5,5 0 1,0 10,0a5,5 0 1,0 -10,0';
      icon.fillColor = '#358292';
      icon.strokeColor = '#358292';
      icon.strokeWeight = 0;
    }
    return icon;
  }

  onBoundsChange() {
    if (typeof this.props.boundsChange === 'function') {
      const bounds = this.refs.map.getBounds().toUrlValue(4).split(',');
      this.props.boundsChange(bounds);
    }
  }

  render() {
    const [leftWidth, rightWidth] = getTwoColumnWidthPercent(this.props.width, 0);
    return (
      <div id='explore-section' className='theme-white' style={{height: (this.getHeight() - 8) + 'px'}}>
        <div className='wrapper row height-full'>
          <div className='col-four' style={{width: leftWidth + '%'}}>
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
          <div className='col-eight' style={{width: rightWidth + '%'}}>
            {this.props.mostShared.isFetching &&
              <div className='loading-data'>
                <h3>
                  <FormattedMessage
                      id='loading.parks'
                      defaultMessage={`Loading parks...`} />
                </h3>
              </div>
            }
            <Navigator
              items={this.props.mostShared.parks}
              selectedItem={this.state.selectedMarker}
              nameKey={'unit_name'}
              idKey={'superunit_id'}
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
              onBoundsChanged={this.onBoundsChangeDebounced.bind(this)}
              >
              <GmapControls {...this.props} />
              <CustomTileLayer tileUrl='http://{s}.map.parks.stamen.com/{z}/{x}/{y}{r}.png' {...this.props} />
              {this.props.mostShared.parks.map((marker, index) => {
                const coords = marker.centroid.coordinates;
                return (<Marker
                  key={marker.superunit_id}
                  onClick={this.onMarkerClick.bind(this, marker)}
                  icon={this.getMarkerIcon(index)}
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
