import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import {connect} from 'react-redux';
import {throttle, isEmpty} from 'lodash';

import {NonFullscreenSection} from '../components/nonFullscreenSection';
import HomeIndex from '../partials/index';
import Explore from '../partials/explore';
import Discover from '../partials/discover';
import Footer from '../partials/footer';
import StickyNav from '../partials/sticky-nav';
import * as actions from '../actions';
import {MOBILE_BREAKPOINT} from '../../constants/layout';

import {SectionsContainer, Section} from 'react-fullpage';

const mapStateToProps = (state) => state;

export class App extends PureComponent {
  static propTypes = {
    mostSharedParks: PropTypes.object,
    fetchMostSharedParks: PropTypes.func.isRequired,
    featuredParks: PropTypes.object,
    fetchFeaturedParks: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    viewData: PropTypes.object.isRequired,
    history: PropTypes.object,
    setWindowSize: PropTypes.func,
    windowSize: PropTypes.object
  };

  state = {
    currentSection: 0,
    prevSection: 0
  };

  componentWillMount() {}

  componentDidMount() {
    this.handleResizeThrottled = throttle(this.handleResize, 250).bind(this);
    window.addEventListener('resize', this.handleResizeThrottled);

    // Cause a re-render to resize components with
    // window size
    this.handleResize();

    if (isEmpty(this.props.featuredParks)) {
      this.props.fetchFeaturedParks();
    }

    if (isEmpty(this.props.mostSharedParks.parks)
                && !this.props.mostSharedParks.isFetching) {
      this.props.fetchMostSharedParks();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeThrottled);
    this.props.clearMostSharedParks();
  }

  onLeaveHandler(prevSection, currentSection) {
    console.log('Leaving: from %s to %s', prevSection, currentSection);
    if (this.state.currentSection !== currentSection) {
      this.setState({
        currentSection: currentSection,
        prevSection: prevSection
      });
    }
  }

  onAfterLoadHandler(currentSection) {
    console.log('Arrived at %s', currentSection);
    if (currentSection !== this.state.currentSection) {
      this.setState({
        currentSection: currentSection
      });
    }
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

  handleResize() {
    const {windowSize} = this.props;
    const dims = this.getWindowDimensions();

    if (dims.width === windowSize.width && dims.height === windowSize.height) return;
    this.props.setWindowSize(dims);
  }

  handleExploreChange(interval, zoom) {
    const {mostSharedParks, fetchMostSharedParks} = this.props;
    if (mostSharedParks.isFetching) return;

    const shouldGetAllParks = (zoom >= 13) ? true : false;
    fetchMostSharedParks(interval.value, mostSharedParks.bbox, shouldGetAllParks);
  }

  handleExploreBoundsChange(bounds, zoom) {
    const {mostSharedParks, fetchMostSharedParks} = this.props;
    if (mostSharedParks.isFetching) return;

    const shouldGetAllParks = (zoom >= 13) ? true : false;
    fetchMostSharedParks(mostSharedParks.interval, [bounds[1], bounds[0], bounds[3], bounds[2]], shouldGetAllParks);
  }

  render() {
    // Default to scroll bar, will be disabled dynamically once the window size
    // is known, if not mobile
    const isMobile = (this.props.windowSize.width === undefined || this.props.windowSize.width < MOBILE_BREAKPOINT) ? true : false;
    const scrollBar = isMobile;
    const options = {
      activeClass:          'active', // the class that is appended to the sections links
      anchors:              ['index', 'explore', 'discover', 'footer'], // the anchors for each sections
      arrowNavigation:      true, // use arrow keys
      className:            'SectionContainer', // the class name for the section container
      delay:                700, // the scroll animation speed
      navigation:           false, // use dots navigation
      scrollBar:            scrollBar, // use the browser default scrollbar
      sectionClassName:     'section', // the section class name
      sectionPaddingTop:    '0', // the section top padding
      sectionPaddingBottom: '0', // the section bottom padding
      verticalAlign:        false, // align the content of each section vertical
      autoFooterHeight:     true,
      css3:                 true
    };

    const isSticky = (this.state.currentSection >= 2 || (this.state.currentSection === 1 && this.state.prevSection > 1)) ? true : false;
    const stickyKlass = (this.state.currentSection === 2 || this.state.currentSection === 3) ? ' white' : '';
    const sectionHeight = (isMobile ? 'auto' : (this.props.windowSize.height || 0));
    const sectionComponent = (isMobile ? NonFullscreenSection : Section);

    return (
      <div className='container page-home'>
        {isSticky &&
          <div className={'sticky-container'}>
            <StickyNav className={stickyKlass}/>
          </div>
        }
        <SectionsContainer
          onLeave={this.onLeaveHandler.bind(this)}
          afterLoad={this.onAfterLoadHandler.bind(this)} {...options}>
          <sectionComponent windowHeight={sectionHeight}>
            <HomeIndex
              height={sectionHeight}
              width={this.props.windowSize.width || 0}
              images={this.props.viewData.header}
              autoplay={true}
              autoplaySpeed={8000}
              featuredParks={this.props.featuredParks}/>
          </sectionComponent>
          <Section>
            <StickyNav className={stickyKlass}/>
            <Explore
              mostShared={this.props.mostSharedParks}
              width={this.props.windowSize.width || 0}
              height={this.props.windowSize.height || 0}
              handleOnChange={this.handleExploreChange.bind(this)}
              boundsChange={this.handleExploreBoundsChange.bind(this)} />
          </Section>
          <Section>
            <Discover
              width={this.props.windowSize.width || 0}
              height={this.props.windowSize.height || 0} />
          </Section>
          <Section>
            <Footer lang={this.props.lang} />
          </Section>
        </SectionsContainer>
      </div>
    );
  }
}

export const AppContainer = connect(mapStateToProps, actions)(App);
