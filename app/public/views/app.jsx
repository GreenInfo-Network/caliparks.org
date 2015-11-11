import {Map} from 'immutable';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {throttle} from 'lodash';

import Header from '../partials/header';
import Explore from '../partials/explore';
import Discover from '../partials/discover';
import Footer from '../partials/footer';
import SliderMostShared from '../partials/sliderMostShared';
import StickyNav from '../partials/sticky-nav';
import Schticky from '../lib/sticky';
import * as actions from '../actions';

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
    history: PropTypes.object
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

  render() {
    return (
      <div className='container'>
        <Header images={this.props.viewData.header} autoplay={true} autoplaySpeed={8000} />
        <SliderMostShared featuredParks={this.props.featuredParks} />
        <main role='application'>
          <div>
            <StickyNav />
            <Schticky className={'real-sticky'}>
              <StickyNav />
            </Schticky>
          </div>
          <Explore
            height={this.props.windowSize.height || 0}
            mostSharedParks={this.props.mostSharedParks}
            handleOnChange={this.handleExploreChange.bind(this)}
            handleMarkerClick={this.handleMarkerClick.bind(this)} />
          <Discover />
        </main>
        <Footer lang={this.props.lang} />
      </div>
    );
  }
}

export const AppContainer = connect(mapStateToProps, actions)(App);
