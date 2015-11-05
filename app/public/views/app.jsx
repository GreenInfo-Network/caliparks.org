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
import api from '../../services/xhr';
import * as actionCreators from '../action_creators';

function mapStateToProps(state) {
  console.log('mapStateToProps:', state.toJS());
  // NOTE: this assumes that state is always an ImmutableJS object
  return state.toJS();
}

export class App extends React.Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    viewData: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state.parks = this.props.viewData.parks || [];
  }

  state = {
    parks: [],
    win: {height: 0, width: 0}
  };

  componentWillMount() {}

  componentDidMount() {
    this.handleResizeThrottled = throttle(this.handleResize, 250).bind(this);
    window.addEventListener('resize', this.handleResizeThrottled);

    // Cause a re-render to resize components with
    // window size
    this.handleResize();

    // TODO replace this with a redux action that loads these
    if (this.state.parks.length === 0) {
      api.get('parks', {})
        .then((parks) => {
          console.log('park data:', parks);

          if (this.mounted()) {
            this.setState({
              parks
            });
          }
        })
        .catch((err) => {
          console.error('Error: ', err);
        });
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
        <Header images={this.props.viewData.header} />
        <Home parks={this.state.parks} />
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

export const AppContainer = connect(mapStateToProps, actionCreators)(App);
