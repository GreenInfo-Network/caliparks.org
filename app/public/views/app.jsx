import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import Header from '../components/header';
import Home from './home';

class App extends React.Component {
  static propTypes = {
    payload: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.renderable
    ]).isRequired
  };

  lastPath = null;
  state = {
    height: '500px'
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize(evt) {
    this.setState({height: window.innerHeight});
  }

  render() {
    const windowHeight = this.state.height;
    const { pathname } = this.props.location;
    let containerKlass = (pathname === '/') ? 'container' : 'container sub-section';

    if (pathname === '/' && this.lastPath && this.lastPath !== '/') {
      containerKlass = 'container goto-home';
    }

    let containerTransform = null;
    if (containerKlass.indexOf('sub-section') > 1) {
      containerTransform = 'translate3d(0px,-' + windowHeight + 'px,0px)';
    }

    this.lastPath = pathname;

    return (
      <div className={containerKlass} style={{transform: containerTransform}}>
        <div className='fullpage' style={{height: windowHeight}}>
          <Header {...this.props.payload} />
          <Home {...this.props} />
        </div>

        <main role='application' className='fullpage' style={{height: windowHeight}}>
          <div className='sub-nav'>
            <h1><Link to='/'>Caliparks</Link></h1>
          </div>
          <ReactCSSTransitionGroup component='div' transitionName='example' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            {React.cloneElement(this.props.children || <div />, { key: pathname })}
          </ReactCSSTransitionGroup>
        </main>
      </div>
    );
  }
}

export default App;
