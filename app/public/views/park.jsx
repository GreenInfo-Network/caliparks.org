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
    fetchSelectedPark: PropTypes.func
  };

  state = {
    selectedPhoto: 0
  };

  componentWillMount() {}

  componentDidMount() {
    this.handleResizeThrottled = throttle(this.handleResize, 250).bind(this);
    window.addEventListener('resize', this.handleResizeThrottled);
    this.handleResize();

    if (Map(this.props.selectedPark.park).isEmpty()
                && !this.props.selectedPark.isFetching) {
      this.props.fetchSelectedPark(this.props.params.id);
    }
  }

  componentDidUpdate() {
    /*
    if (!this.props.selectedPark.park.length) return;
    const details = this.props.selectedPark.park[0];

    if (this.refs.mapp && this.refs.mapp.refs.map) {
      if (!this.boundsSet) {
        const bds = this.geoJSONBBoxToGoogleBounds(details.bbox.coordinates[0]);
        if (!bds.isEmpty()) {
          this.boundsSet = true;
          this.refs.mapp.refs.map.fitBounds(bds);
        }
      }
    }
    */
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeThrottled);
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

  onPhotoClick(idx) {
    if (this.state.selectedPhoto === idx) return;
    this.setState({selectedPhoto: idx});
  }

  getColumnHeight() {
    if (this.props.windowSize.width === 0) return '0px';
    return Math.round((this.props.windowSize.width - 20) * 0.3333333) + 'px';
  }

  handleResize() {
    this.props.setWindowSize(this.getWindowDimensions());
  }

  geoJSONBBoxToGoogleBounds(envelope) {
    const bds = new google.maps.LatLngBounds(new google.maps.LatLng(envelope[0][1], envelope[0][0]));
    for (let i = 0; i < envelope.length; i++) {
      bds.extend(new google.maps.LatLng(envelope[i][1], envelope[i][0]));
    }
    return bds;
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

  render() {
    console.log(this.props.selectedPark);
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
                <ParkMap ref='mapp' park={this.props.selectedPark} selectedMarker={this.state.selectedPhoto}/>
              </div>
            </div>
            <div className='col photo' style={{height: this.getColumnHeight()}}>
              {this.placeImage()}
            </div>
          </div>
          <div className='page-park-bottom'>
            <PhotoGrid photos={this.props.selectedPark.images} selected={this.state.selectedPhoto} onPhotoClick={this.onPhotoClick.bind(this)} />
          </div>
        </main>
      </div>
    );
  }
}

export const ParkContainer = connect(mapStateToProps, actions)(Park);
