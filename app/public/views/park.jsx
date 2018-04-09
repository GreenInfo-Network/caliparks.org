import PureComponent from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {throttle, isEmpty} from 'lodash';
import * as actions from '../actions';

import Footer from '../partials/footer';
import StickyNav from '../partials/sticky-nav';
import ParkMap from '../components/parkMap';
import ActivityGrid from '../components/activityGrid';
import Slider from 'react-slick';
import socs from '../lib/socs';
import {directionsLink} from '../../constants/map';
import {MOBILE_BREAKPOINT} from '../../constants/layout';

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
    selectedPhoto: null,
    badImages: [],
    tabSection: 'photos',
    expandedOuterSpatialSection: '',
  };

  componentWillMount() {
    this.currentSlide = 0;
    // set state back to original state
    this.setState({
      selectedPhoto: null,
      badImages: []
    });
    // this.socs = null;
    this.mapNeedsResizing = true;
    this.getInitialSelectedPhoto();
  }

  componentDidMount() {
    // always start at top
    window.scrollTo(0, 0);

    this.handleResizeThrottled = throttle(this.handleResize, 250).bind(this);
    window.addEventListener('resize', this.handleResizeThrottled);
    document.querySelector('body').style.overflow = 'auto';
    this.handleResize();

    this.shouldFetchSelectedPark();

    this.socs = socs.sharing();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.selectedPark.parkid) {
      this.setState({
        selectedPhoto: null,
        badImages: []
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.fetchSelectedPark(nextProps.params.id);
    } else {
      this.mapNeedsResizing = false;
      if (nextState.tabSection === 'map' && (this.state.tabSection !== nextState.tabSection)) this.mapNeedsResizing = true;
      if (nextProps.windowSize.width !== this.props.windowSize.width || nextProps.windowSize.height !== this.props.windowSize.height) this.mapNeedsResizing = true;
      if (nextState.badImages !== this.state.badImages) this.mapNeedsResizing = true;
    }

    this.getInitialSelectedPhoto();
  }

  componentDidUpdate() {
    this.getInitialSelectedPhoto();
    if (this.socs) this.socs.refresh();
  }

  componentWillUnmount() {
    this.props.clearSelectedParkData(this.props.params.id);
    window.removeEventListener('resize', this.handleResizeThrottled);
    this.handleResizeThrottled = null;
    if (this.socs) this.socs.destroy();
    this.socs = null;
  }

  shouldFetchSelectedPark() {
    if (!this.props.selectedPark.isFetching) {
      if (isEmpty(this.props.selectedPark.park)) {
        this.props.fetchSelectedPark(this.props.params.id);
      } else if (this.props.selectedPark.parkid !== this.props.params.id) {
        this.props.fetchSelectedPark(this.props.params.id);
      }
    }
  }

  getInitialSelectedPhoto() {
    if (this.state.selectedPhoto === null &&
        this.props.selectedPark.images &&
        this.props.selectedPark.images.length) {
      this.setState({selectedPhoto: this.props.selectedPark.images[0].photoid});
    }
  }

  onPhotoClick(photo, evt) {
    const id = photo.photoid;
    const {windowSize} = this.props;
    const isMobile = (windowSize.width < MOBILE_BREAKPOINT) ? true : false;

    if (!isMobile) evt.preventDefault();

    if (this.state.selectedPhoto === id && !isMobile) return;

    this.setState({selectedPhoto: id});
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
  //
  // returns [columnWidth, columnMiddleWidth, columnHeight, columnMiddleHeight, bottomHeight]
  getDimensions() {
    if (!this.props.windowSize.width ||
        this.props.windowSize.width === 0 ||
        this.props.windowSize.width < MOBILE_BREAKPOINT) {
      return ['100%', '100%', 'auto', this.props.windowSize.width + 'px', 'auto'];
    }

    const photoSliderHeight = 160 + 20; // with padding
    const topContainerPadding = 20;
    const nav = 76;
    const imagesExist = this.getValidImages().length > 0;
    let bottomHeight = (imagesExist) ? photoSliderHeight : 0;
    const availableWidth = this.props.windowSize.width - 20;

    let columnWidth = '33.3333%';
    let columnMiddleWidth = '33.3333%';
    let topHeight = this.props.windowSize.height - nav - topContainerPadding;

    if (!imagesExist) {
      // No images, let the middle column (map) take up more room
      columnMiddleWidth = '66.6666%';
    } else {
      topHeight -= photoSliderHeight;
      columnMiddleWidth = (availableWidth - (2 * topHeight));

      if (columnMiddleWidth < topHeight) {
        // Narrow screen
        columnWidth = columnMiddleWidth = '33.3333%';
        topHeight = Math.round(availableWidth / 3.0);
        bottomHeight = this.props.windowSize.height - topHeight - nav - topContainerPadding * 2;
      } else {
        // Wide screen
        const outerColumnWidth = Math.max(330, (availableWidth - columnMiddleWidth) / 2) / availableWidth * 100;
        columnMiddleWidth = (100 - outerColumnWidth * 2) + '%';
        columnWidth = outerColumnWidth + '%';
        topHeight = Math.round(availableWidth * (outerColumnWidth / 100));
      }
    }
    return [columnWidth, columnMiddleWidth, topHeight + 'px', topHeight + 'px', bottomHeight + 'px'];
  }

  getSlidesToShowLength() {
    if (this.props.windowSize.width === 0 || this.props.windowSize.width < MOBILE_BREAKPOINT) return 1;
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

    const mapHeight = this.getDimensions()[3];
    const photoMaxHeight = (mapHeight.replace('px', '') - 14) + 'px';  // if oversize, crop to leave the bottom frame

    return (
      <div className='inner'>
        <div className='instagram-logo' />
        <a className='block' href={image[0].link} target='_blank' style={{'height': mapHeight, 'min-height': mapHeight}}>
          <img src={image[0].standard_resolution} style={{'max-height': photoMaxHeight}} />
        </a>
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

  renderOuterspatial() {
    const parkdetails = this.props.selectedPark.park[0];
    if (! parkdetails.alerts && ! parkdetails.description && ! parkdetails.events && ! parkdetails.aboutvisiting) return [];

    const expandedSection = this.state.expandedOuterSpatialSection;

    // all of the HTML blocks we're bringing below, are pre-formatted and known to come from a trustworthy source
    // so we disable the escaping, and just use SPAN elements cuz they have their own P and H1 etc.
    return (
      <div className='outerspatial'>
        {(() => {
          if (parkdetails.alerts || parkdetails.description) {
            const sectionid = 'highlights';
            const displayMode = expandedSection === sectionid ? 'block' : 'none';
            const triangle = expandedSection === sectionid ? '/assets/svgs/icon-down-triangle.svg' : '/assets/svgs/icon-right-triangle.svg';

            return (
              <span>
              <h1 onClick={this.selectOuterSpatialSection.bind(this, sectionid)}><img src={ triangle } />  Highlights</h1>
              <div className='outerspatial-section outerspatial-highlights' style={{ display: displayMode }}>
                <span dangerouslySetInnerHTML={{__html: parkdetails.alerts}}></span>
                <span dangerouslySetInnerHTML={{__html: parkdetails.description}}></span>
              </div>
              </span>
            );
          }
        })()}

        {(() => {
          if (parkdetails.photos) {
            const sectionid = 'photos';
            const displayMode = expandedSection === sectionid ? 'block' : 'none';
            const triangle = expandedSection === sectionid ? '/assets/svgs/icon-down-triangle.svg' : '/assets/svgs/icon-right-triangle.svg';

            const slicksettings = {
              dots: false,
              infinite: true,
              speed: 500,
              arrows: true,
              variableWidth: true,
              initialSlide: 0,
              slidesToShow: 1,
              slidesToScroll: 1,
            };

            // photo HTML is contrived: newline separated DIVs, which we can split apart and interpolate into the Slider
            const photodivs = parkdetails.photos.split('\n').map((divhtml) => {
              return divhtml.replace('<div>', '').replace('</div>', '').replace('medium_square', 'small_square');
            });

            // the photo HTML is contrived to fit into a Slider: split on newlines to get DIVs, interpolate them
            return (
              <span>
              <h1 onClick={this.selectOuterSpatialSection.bind(this, sectionid)}><img src={ triangle } />  Official Photos</h1>
              <div className='outerspatial-section outerspatial-photos' style={{ display: displayMode }}>
                <Slider {...slicksettings}>
                  {(() => {
                    return photodivs.map((divhtml) => {
                      return (<div dangerouslySetInnerHTML={{__html: divhtml}}></div>);
                    });
                  })()}
                </Slider>
              </div>
              </span>
            );
          }
        })()}

        {(() => {
          if (parkdetails.events) {
            const sectionid = 'events';
            const displayMode = expandedSection === sectionid ? 'block' : 'none';
            const triangle = expandedSection === sectionid ? '/assets/svgs/icon-down-triangle.svg' : '/assets/svgs/icon-right-triangle.svg';

            return (
              <span>
              <h1 onClick={this.selectOuterSpatialSection.bind(this, sectionid)}><img src={ triangle } />  Featured Events</h1>
              <div className='outerspatial-section outerspatial-events' style={{ display: displayMode }}>
                <span dangerouslySetInnerHTML={{__html: parkdetails.events}}></span>
              </div>
              </span>
            );
          }
        })()}

        {(() => {
          if (parkdetails.aboutvisiting) {
            const sectionid = 'aboutvisiting';
            const displayMode = expandedSection === sectionid ? 'block' : 'none';
            const triangle = expandedSection === sectionid ? '/assets/svgs/icon-down-triangle.svg' : '/assets/svgs/icon-right-triangle.svg';

            return (
              <span>
              <h1 onClick={this.selectOuterSpatialSection.bind(this, sectionid)}><img src={ triangle } /> About Visiting</h1>
              <div className='outerspatial-section outerspatial-aboutvisiting' style={{ display: displayMode }}>
                <span dangerouslySetInnerHTML={{__html: parkdetails.aboutvisiting}}></span>
              </div>
              </span>
            );
          }
        })()}
      </div>
    );
  }

  selectOuterSpatialSection(whichsection) {
    // selecting already-expanded = collapse all
    const newsection = whichsection === this.state.expandedOuterSpatialSection ? '' : whichsection;

    this.setState({
      expandedOuterSpatialSection: newsection,
    });
  }

  renderDetails() {
    if (!this.props.selectedPark.park.length) return [];
    const details = this.props.selectedPark.park[0];
    const directions = directionsLink(details.centroid);
    const involved = this.props.selectedPark.involved || null;

    return (
      <div className='inner'>
        <h4 className='uppercase'>{details.su_name}</h4>
        {details.park_url &&
          <p className='park-link-p'><a className='link-plain' href={details.park_url} target='_blank'>
          <FormattedMessage
            id='park.park-link'
            defaultMessage='Link to park site'
          />
          <sub> &gt;</sub>
          </a></p>
        }
        {involved &&
          <p className='involved-link'><a className='link-plain' href={involved} target='_blank'>
          <FormattedMessage
            id='park.involved-link'
            defaultMessage='Get involved with this park'
          />
          <sub> &gt;</sub>
          </a></p>
        }
        <ActivityGrid activities={details.activities} {...this.props} />
        <div className='share'>
          <ul>
            <li><a className='link-plain social-item' data-social-service='facebook' href='#'>
              <FormattedMessage
                id='social.share'
                defaultMessage='Share'
              />
            </a></li>
            <li><a className='link-plain social-item' data-social-service='twitter' data-social-title={details.su_name} data-social-hashtags='caliparks' href='#'>
              <FormattedMessage
                id='social.tweet'
                defaultMessage='Tweet'
              />
            </a></li>
            <li><a className='link-plain' href={directions} target='_blank'>
              <FormattedMessage
                id='directions-link'
                defaultMessage='Get Directions'
              />
            </a></li>
            {details.camping_url &&
              <li><a className='link-plain' href={details.camping_url} target='_blank'>
                <FormattedMessage
                  id='camp-here'
                  defaultMessage='Camp Here'
                />
              </a></li>
            }
          </ul>
        </div>
        {this.renderOuterspatial()}
      </div>
    );
  }

  onImageError(photo) {
    const badImages = this.state.badImages.slice(0);
    badImages.push(photo.photoid);
    this.setState({
      badImages: badImages
    });
  }

  getValidImages() {
    return this.props.selectedPark.images.filter((img) => {
      return this.state.badImages.indexOf(img.photoid) < 0;
    });
  }

  makeSlides() {
    return this.getValidImages().map((photo, idx) => {
      const klass = photo.photoid === this.state.selectedPhoto ? 'selected' : '';
      return (
        <div className={klass} key={idx}><a href={photo.link} onClick={this.onPhotoClick.bind(this, photo)}><img onError={this.onImageError.bind(this, photo)} src={photo.standard_resolution}/></a></div>
      );
    });
  }

  onSliderAfterChange(currentSlide) {
    this.currentSlide = currentSlide;
    const {selectedPark} = this.props;
    if (selectedPark.fetching) return;

    if (this.shouldLoadPhotos(currentSlide)) {
      this.loadPhotos();
    }
  }

  shouldLoadPhotos(currentSlide) {
    const numShowing = this.getSlidesToShowLength();
    const {badImages} = this.state;
    const {images, totalImages} = this.props.selectedPark;

    const currentPosition = currentSlide + numShowing;
    const end = images.length - badImages.length;

    return (currentPosition >= end && images.length < totalImages);
  }

  onTabChange(val) {
    if (val === this.state.tabSection) return;
    this.setState({tabSection: val});
  }

  getTabBtnClass(val) {
    const active = val === this.state.tabSection ? ' active' : '';
    return 'btn' + active;
  }

  render() {
    const {selectedPark, windowSize} = this.props;
    const {selectedPhoto, tabSection} = this.state;
    const geometry = selectedPark.park.length ? selectedPark.park[0].geometry : null;
    const [columnWidth, columnMiddleWidth, columnHeight, mapHeight, bottomHeight] = this.getDimensions();

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      arrows: true,
      slidesToShow: this.getSlidesToShowLength(),
      variableWidth: true,
      slidesToScroll: Math.max(1, this.getSlidesToShowLength() - 1),
      initialSlide: 0
    };

    // If mobile show one window-wide slide at a time
    if (windowSize.width < MOBILE_BREAKPOINT) {
      settings.variableWidth = false;
      settings.slideHasThisWidth = windowSize.width;
    }

    const parkSlideClass = selectedPark.isFetching ? ' loading' : '';
    const validImages = this.getValidImages();
    const markers = validImages.filter((photo, idx) => {
      return selectedPhoto === photo.photoid;
    });

    // In case we have no images...
    const containerClass = (validImages.length === 0) ? 'theme-white page-park container no-images' : 'theme-white page-park container';

    // details panel caps height ON DESKTOP to force scrolling
    // gda
    const detailsMaxHeight = windowSize.width < MOBILE_BREAKPOINT ? 'none' : columnHeight;

    return (
      <div className={containerClass + ' tab-' + tabSection}>
        <StickyNav />
        <main role='application' style={{paddingBottom: bottomHeight}}>
          <div className='page-park-wrapper'>
            <div className='col details' style={{height: columnHeight, maxHeight: detailsMaxHeight, width: columnWidth }}>
              {this.renderDetails()}
            </div>
            <div className='tabs'>
              <div className='tabs-inner'>
                <button className={this.getTabBtnClass('photos')} onClick={this.onTabChange.bind(this, 'photos')}>
                  <FormattedMessage
                    id='tab.photoview'
                    defaultMessage='Photo View' />
                </button>
                <button className={this.getTabBtnClass('map')} onClick={this.onTabChange.bind(this, 'map')}>
                  <FormattedMessage
                    id='tab.mapview'
                    defaultMessage='Map View' />
                </button>
              </div>
            </div>
            <div className='col map' style={{height: mapHeight, width: columnMiddleWidth}}>
              <div className='inner'>
                <ParkMap
                  shouldResize={this.mapNeedsResizing}
                  markers={markers}
                  cluster={false}
                  geometry={geometry}
                  selectedMarker={selectedPhoto}
                  setMarkerIcon={this.setMarkerIcon.bind(this)}
                  setMarkerId={this.setMarkerId.bind(this)}
                  setMarkerPosition={this.setMarkerPosition.bind(this)}/>
              </div>

              <div className='park-slider-container' style={{height: bottomHeight}}>
                <div className='slider-inner'>
                  <div className={'park-slider' + parkSlideClass}>
                    <div className='loader' />
                    <Slider {...settings} afterChange={this.onSliderAfterChange.bind(this)}>
                      {this.makeSlides()}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>

            <div className='col selected-photo' style={{height: columnHeight, width: columnWidth}}>
              {this.placeImage()}
            </div>

          </div>
        </main>
        <div>
          <div className='scroll-helper-arrow down no-arrow'/>
          <Footer lang={this.props.lang} />
        </div>
      </div>
    );
  }
}

export const ParkContainer = injectIntl(connect(mapStateToProps, actions)(Park));
