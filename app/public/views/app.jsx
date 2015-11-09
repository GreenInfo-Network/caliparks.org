import {Map} from 'immutable';
import {throttle} from 'lodash';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Header from '../components/header';
import Home from './home';
import Explore from './explore';
import Discover from './discover';
import Footer from '../partials/footer';
import StickyNav from '../partials/sticky-nav';
import Schticky from '../lib/sticky';
import * as actions from '../actions';

function mapStateToProps(state) {
  // NOTE: this may or may not be an Immutable JS object
  return Map(state).toJS();
}

export class App extends React.Component {
  static propTypes = {
    featuredParks: PropTypes.object,
    fetchFeaturedParks: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    viewData: PropTypes.object.isRequired
  };

  state = {
    win: {height: 0, width: 0}
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
    this.setState({win: this.getWindowDimensions()});
  }

  render() {
    return (
      <div className='container'>
        <Header images={this.props.viewData.header} autoplay={true} autoplaySpeed={8000} />
        <Home featuredParks={this.props.featuredParks} />
        <main role='application'>
          <Schticky>
            <StickyNav />
          </Schticky>
          <Explore height={this.state.win.height} />
          <Discover />
        </main>
        <Footer lang={this.props.lang} />
      </div>
    );
  }
}

export const AppContainer = connect(mapStateToProps, actions)(App);
