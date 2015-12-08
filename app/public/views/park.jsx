import PureComponent from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {throttle, isEmpty} from 'lodash';
import * as actions from '../actions';

import StickyNav from '../partials/sticky-nav';
import ParkMap from '../components/parkMap';
import ActivityGrid from '../components/activityGrid';
// import PhotoGrid from '../components/photoGrid';
import Slider from 'react-slick';
import {socs} from '../lib/socs';
import {directionsLink} from '../../constants/map';

function mapStateToProps(state) {
  return state;
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
    selectedPhoto: null
  };

  componentWillMount() {
    this.getInitialSelectedPhoto();
  }

  componentDidMount() {
    this.handleResizeThrottled = throttle(this.handleResize, 250).bind(this);
    window.addEventListener('resize', this.handleResizeThrottled);
    this.handleResize();

    if (!this.props.selectedPark.isFetching) {
      if (isEmpty(this.props.selectedPark.park)) {
        this.props.fetchSelectedPark(this.props.params.id);
      } else if (this.props.selectedPark.parkid !== this.props.params.id) {
        this.props.fetchSelectedPark(this.props.params.id);
      }
    }

    this.socs = socs.sharing();
  }

  componentDidUpdate() {
    this.getInitialSelectedPhoto();
    if (this.socs) this.socs.refresh();
  }

  componentWillUnmount() {
    this.props.clearSelectedParkData(this.props.params.id);
    window.removeEventListener('resize', this.handleResizeThrottled);
    if (this.socs) this.socs.destroy();
    this.socs = null;
  }

  getInitialSelectedPhoto() {
    if (this.state.selectedPhoto === null &&
        this.props.selectedPark.images &&
        this.props.selectedPark.images.length) {
      this.setState({selectedPhoto: this.props.selectedPark.images[0].photoid});
    }
  }

  onPhotoClick(idx) {
    if (this.state.selectedPhoto === idx) return;
    this.setState({selectedPhoto: idx});
  }

  setMarkerIcon(marker, idx) {
    if (marker.photoid === this.state.selectedPhoto) return '/assets/svgs/icon-instagram.svg';
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

  // TODO: clean this up
  // got messy when we had to account for
  // no images
  getDimensions() {
    if (this.props.windowSize.width === 0) return ['0px', '0px', '0px', '0px'];
    const photoSliderHeight = 160 + 20; // with padding
    const topContainerPadding = 20;
    const nav = 76;
    const imagesLength = this.props.selectedPark.images.length;

    let topHeight = (imagesLength) ? this.props.windowSize.height - nav - topContainerPadding - photoSliderHeight :
      this.props.windowSize.height - nav - topContainerPadding;
    let bottomHeight = (imagesLength) ? this.props.windowSize.height - nav - topHeight - topContainerPadding : 0;
    let middleWidth = (this.props.windowSize.width - 20 - (2 * topHeight));

    if (!imagesLength) {
      return ['33.3333%', '66.6666%', topHeight + 'px', bottomHeight + 'px'];
    } else if (middleWidth < topHeight) {
      middleWidth = 33.3333;
      topHeight = Math.round((this.props.windowSize.width - 20) * (middleWidth / 100));
      bottomHeight = this.props.windowSize.height - nav - topHeight - topContainerPadding;
      return [middleWidth + '%', middleWidth + '%', topHeight + 'px', bottomHeight + 'px'];
    }

    middleWidth = middleWidth / this.props.windowSize.width * 100;
    return [topHeight + 'px', middleWidth + '%', topHeight + 'px', bottomHeight + 'px'];
  }

  getSlidesToShowLength() {
    if (this.props.windowSize.width === 0) return 4;
    return Math.ceil((this.props.windowSize.width - 20) / 160);
  }

  loadPhotos() {
    if (!this.props.selectedPark.images.length) return;
    if (this.props.selectedPark.isFetching) return;
    this.props.fetchSelectedParkPhotos(this.props.params.id, this.props.selectedPark.images.length);
  }

  placeImage() {
    if (!this.props.selectedPark.images.length && !this.state.selectedPhoto) return [];
    const image = this.props.selectedPark.images.filter((photo) => {
      return photo.photoid === this.state.selectedPhoto;
    });
    if (!image.length) return [];

    return (
      <div className='inner'>
        <div className='instagram-logo' />
        <a className='block' href={image[0].link} target='_blank'><img src={image[0].standard_resolution} /></a>
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
    const directions = directionsLink(details.centroid);
    const involved = this.props.selectedPark.involved || null;

    return (
      <div className='inner'>
        <h4 className='uppercase'>{details.su_name}</h4>
        <p><a className='link-plain' href={details.park_url} target='_blank'>Link to park site <sub>&gt;</sub></a></p>
        {involved &&
          <p className='involved-link'><a className='link-plain' href={involved} target='_blank'>Get involved with this park <sub>&gt;</sub></a></p>
        }
        <ActivityGrid activities={details.activities} />
        <div className='share'>
          <ul>
            <li><a className='link-plain social-item' data-social-service='facebook' href='#'>Share</a></li>
            <li><a className='link-plain social-item' data-social-service='twitter' data-social-title={details.su_name} data-social-hashtags='caliparks' href='#'>Tweet</a></li>
            <li><a className='link-plain' href={directions} target='_blank'>Get Directions</a></li>
            {details.camping_url &&
              <li><a className='link-plain' href={details.camping_url} target='_blank'>Camp Here</a></li>
            }
          </ul>
        </div>
      </div>
    );
  }

  onImageError(evt) {
    // TODO: Doesn't work when trying
    // to find slide by ref
    try {
      evt.target.parentNode.style.display = 'none';
    } catch (e) {
      console.error(e);
    }
  }

  makeSlides() {
    return this.props.selectedPark.images.map((photo, idx) => {
      const klass = photo.photoid === this.state.selectedPhoto ? 'selected' : '';
      return (
        <div className={klass} key={idx}><img src={photo.standard_resolution} onError={this.onImageError} onClick={this.onPhotoClick.bind(this, photo.photoid)}/></div>
      );
    });
  }

  onSliderAfterChange(currentSlide) {
    const numShowing = this.getSlidesToShowLength();
    if (currentSlide + numShowing >= this.props.selectedPark.images.length && !this.props.selectedPark.isFetching) {
      this.loadPhotos();
    }
  }

  render() {
    const geometry = this.props.selectedPark.park.length ? this.props.selectedPark.park[0].geometry : null;
    const [columnWidth, columnMiddleWidth, columnHeight, bottomHeight] = this.getDimensions();

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      arrows: true,
      slidesToShow: this.getSlidesToShowLength(),
      variableWidth: false,
      slidesToScroll: this.getSlidesToShowLength(),
      slideHasThisWidth: 160,
      initialSlide: 0
    };

    const parkSlideClass = this.props.selectedPark.isFetching ? ' loading' : '';
    const markers = this.props.selectedPark.images.filter((photo, idx) => {
      return this.state.selectedPhoto === photo.photoid;
    });

    // In case we have no images...
    const noImageKlass = (this.props.selectedPark.images.length === 0) ? ' hide' : '';
    return (
      <div className='container'>
        <main className='theme-white page-park' role='application'>
          <StickyNav />
          <div className='page-park-top'>
            <div className='col details' style={{height: columnHeight, width: columnWidth }}>
              {this.renderDetails()}
            </div>
            <div className='col map' style={{height: columnHeight, width: columnMiddleWidth}}>
              <div className='inner'>
                <ParkMap
                  shouldResize={this.props.windowSize.width + this.props.windowSize.height}
                  markers={markers}
                  geometry={geometry}
                  selectedMarker={this.state.selectedPhoto}
                  setMarkerIcon={this.setMarkerIcon.bind(this)}
                  setMarkerId={this.setMarkerId.bind(this)}
                  setMarkerPosition={this.setMarkerPosition.bind(this)}/>
              </div>
            </div>
            <div className={'col photo' + noImageKlass} style={{height: columnHeight, width: columnWidth}}>
              {this.placeImage()}
            </div>
          </div>
          <div className={'page-park-bottom' + noImageKlass} style={{height: bottomHeight}}>
            <div className={'park-slider' + parkSlideClass}>
              <div className='loader' />
              <Slider {...settings} afterChange={this.onSliderAfterChange.bind(this)}>
                {this.makeSlides()}
              </Slider>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export const ParkContainer = connect(mapStateToProps, actions)(Park);
