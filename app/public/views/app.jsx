import React, {PropTypes} from 'react';
import Header from '../components/header';
import Home from './home';
import Explore from './explore';
import Discover from './discover';
import Footer from '../partials/footer';
import StickyNav from '../partials/sticky-nav';
import Schticky from '../lib/sticky';
import {throttle} from 'lodash';

export default class App extends React.Component {
  static propTypes = {
    payload: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.renderable
    ]).isRequired
  };

  constructor(props) {
    super(props);
  }

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
        <Header {...this.props.payload} />
        <Home {...this.props} />
        <main role='application'>
          <Schticky>
            <StickyNav />
          </Schticky>
          <Explore {...this.props} height={this.state.win.height} />
          <Discover {...this.props} />
        </main>
        <Footer lang={this.props.payload.lang} />
      </div>
    );
  }
}
