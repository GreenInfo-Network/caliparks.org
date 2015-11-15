import {Map} from 'immutable';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {throttle} from 'lodash';

import Header from '../partials/header';
import Explore from '../partials/explore';
import Discover from '../partials/discover';
import Footer from '../partials/footer';
import SliderMostShared from '../partials/sliderMostShared';
import StickyNav from '../partials/sticky-nav';
import Waypoint from 'react-waypoint';
import * as actions from '../actions';

import {SectionsContainer, Section} from 'react-fullpage';

function mapStateToProps(state) {
  // NOTE: this may or may not be an Immutable JS object
  return Map(state).toJS();
}

export class App extends React.Component {
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

  componentWillMount() {}

  componentDidMount() {
    this.handleResizeThrottled = throttle(this.handleResize, 250).bind(this);
    window.addEventListener('resize', this.handleResizeThrottled);

    // Cause a re-render to resize components with
    // window size
    this.handleResize();

    if (Map(this.props.featuredParks).isEmpty()) {
      console.log('Fetching featured parks');
      this.props.fetchFeaturedParks();
    }

    if (Map(this.props.mostSharedParks.parks).isEmpty()
                && !this.props.mostSharedParks.isFetching) {
      console.log('Fetching featured parks');
      this.props.fetchMostSharedParks();
    }
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

  handleResize() {
    this.props.setWindowSize(this.getWindowDimensions());
  }

  handleExploreChange(val) {
    this.props.fetchMostSharedParks(val);
  }

  handleMarkerClick(id) {
    const {history} = this.props;
    history.pushState(null, `/park/${id}`);
  }

  onStickyHandler(msg, evt, pos) {
    console.log('WP: ', msg, pos);
    if (this.refs.sticky) {
      const klass = (msg === 'leave' && pos === 'above') ? 'sticky-container stuck' : 'sticky-container';
      // ReactDOM.findDOMNode(this.refs.sticky).className = klass;
    }
  }

  render() {
    const options = {
      activeClass:          'active', // the class that is appended to the sections links
      anchors:              ['homer', 'explorer', 'discoverr'], // the anchors for each sections
      arrowNavigation:      true, // use arrow keys
      className:            'SectionContainer', // the class name for the section container
      delay:                700, // the scroll animation speed
      navigation:           false, // use dots navigatio
      scrollBar:            false, // use the browser default scrollbar
      sectionClassName:     'section', // the section class name
      sectionPaddingTop:    '0', // the section top padding
      sectionPaddingBottom: '0', // the section bottom padding
      verticalAlign:        false // align the content of each section vertical
    };
    return (
      <div className='container'>
        <SectionsContainer {...options}>
          <Section>
            <Header images={this.props.viewData.header} autoplay={true} autoplaySpeed={8000} />
            <SliderMostShared featuredParks={this.props.featuredParks} />
          </Section>
          <Section>
            <Explore
              height={this.props.windowSize.height || 0}
              mostSharedParks={this.props.mostSharedParks}
              handleOnChange={this.handleExploreChange.bind(this)}
              handleMarkerClick={this.handleMarkerClick.bind(this)} />
          </Section>
          <Section>
            <Discover height={this.props.windowSize.height || 0} />
            <Footer lang={this.props.lang} />
          </Section>
        </SectionsContainer>
      </div>
    );
  }
}

export const AppContainer = connect(mapStateToProps, actions)(App);
