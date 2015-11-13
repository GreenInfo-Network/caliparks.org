import {Map} from 'immutable';
import PureComponent from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {throttle} from 'lodash';
import * as actions from '../actions';

import StickyNav from '../partials/sticky-nav';
import ParkMap from '../components/parkMap';
import ActivityGrid from '../components/activityGrid';
import PhotoGrid from '../components/photoGrid';

function mapStateToProps(state) {
  // NOTE: this may or may not be an Immutable JS object
  return Map(state).toJS();
}

export class Park extends PureComponent {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    selectedPark: PropTypes.object,
    windowSize: PropTypes.object,
    setWindowSize: PropTypes.func,
    fetchSelectedPark: PropTypes.func,
    clearSelectedParkData: PropTypes.func,
    fetchSelectedParkPhotos: PropTypes.func
  };

  state = {
    selectedPhoto: 0
  };

  componentWillMount() {}

  componentDidMount() {
    this.handleResizeThrottled = throttle(this.handleResize, 250).bind(this);
    window.addEventListener('resize', this.handleResizeThrottled);
    this.handleResize();

    if (!this.props.selectedPark.isFetching) {
      if (Map(this.props.selectedPark.park).isEmpty()) {
        this.props.fetchSelectedPark(this.props.params.id);
      } else if (this.props.selectedPark.parkid !== this.props.params.id) {
        this.props.fetchSelectedPark(this.props.params.id);
      }
    }
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    this.props.clearSelectedParkData(this.props.params.id);
    window.removeEventListener('resize', this.handleResizeThrottled);
  }

  onPhotoClick(idx) {
    if (this.state.selectedPhoto === idx) return;
    this.setState({selectedPhoto: idx});
  }

  setMarkerIcon(marker, idx) {
    if (idx === this.state.selectedPhoto) return '/assets/svgs/icon-instagram.svg';
    return '/assets/svgs/icon-square-4px.svg';
  }

  setMarkerId(marker, idx) {
    return marker.photoid;
  }

  setMarkerPosition(marker, idx) {
    return {lat:marker.lat, lng:marker.lng};
  }

  getWindowDimensions() {
    // Need to make sure we have a window due to
    // server rendering...
    if (typeof window === 'undefined') return {width: 0, height: 0};

    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  getColumnHeight() {
    if (this.props.windowSize.width === 0) return '0px';
    return Math.round((this.props.windowSize.width - 20) * 0.3333333) + 'px';
  }

  loadPhotos() {
    if (!this.props.selectedPark.images.length) return;
    if (this.props.selectedPark.isFetching) return;
    this.props.fetchSelectedParkPhotos(this.props.params.id, this.props.selectedPark.images.length);
  }

  placeImage() {
    if (!this.props.selectedPark.images.length) return [];
    const images = this.props.selectedPark.images;
    return (
      <div className='inner'>
        <div className='instagram-logo' />
        <img src={images[this.state.selectedPhoto].standard_resolution} />
      </div>
    );
  }

  geoJSONBBoxToGoogleBounds(envelope) {
    const bds = new google.maps.LatLngBounds(new google.maps.LatLng(envelope[0][1], envelope[0][0]));
    for (let i = 0; i < envelope.length; i++) {
      bds.extend(new google.maps.LatLng(envelope[i][1], envelope[i][0]));
    }
    return bds;
  }

  handleResize() {
    this.props.setWindowSize(this.getWindowDimensions());
  }

  renderDetails() {
    if (!this.props.selectedPark.park.length) return [];
    const details = this.props.selectedPark.park[0];

    return (
      <div className='inner'>
        <h4 className='uppercase'>{details.su_name}</h4>
        <p><a className='link-plain' href={details.park_url}>Link to park site <sub>></sub></a></p>
        <ActivityGrid activities={details.activities} />
        <div className='share'>
          <ul>
            <li><a className='link-plain' href=''>Like</a></li>
            <li><a className='link-plain' href=''>Tweet</a></li>
            <li><a className='link-plain' href=''>Get Directions</a></li>
            <li><a className='link-plain' href=''>Camp Here</a></li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const geometry = this.props.selectedPark.park.length ? this.props.selectedPark.park[0].geometry : null;
    return (
      <div className='container'>
        <main className='theme-white page-park' role='application'>
          <StickyNav />
          <div className='page-park-top'>
            <div className='col details' style={{height: this.getColumnHeight()}}>
              {this.renderDetails()}
            </div>
            <div className='col map' style={{height: this.getColumnHeight()}}>
              <div className='inner'>
                <ParkMap
                  markers={this.props.selectedPark.images}
                  geometry={geometry}
                  selectedMarker={this.state.selectedPhoto}
                  setMarkerIcon={this.setMarkerIcon.bind(this)}
                  setMarkerId={this.setMarkerId.bind(this)}
                  setMarkerPosition={this.setMarkerPosition.bind(this)}/>
              </div>
            </div>
            <div className='col photo' style={{height: this.getColumnHeight()}}>
              {this.placeImage()}
            </div>
          </div>
          <div className='page-park-bottom'>
            <PhotoGrid loadImageHandler={this.loadPhotos.bind(this)} photos={this.props.selectedPark.images} fetching={this.props.selectedPark.isFetching} selected={this.state.selectedPhoto} onPhotoClick={this.onPhotoClick.bind(this)} />
          </div>
        </main>
      </div>
    );
  }
}

export const ParkContainer = connect(mapStateToProps, actions)(Park);
