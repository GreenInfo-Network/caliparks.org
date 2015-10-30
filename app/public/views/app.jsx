import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import Header from '../components/header';
import Home from './home';
import Explore from './explore';
import Discover from './discover';
import Footer from '../partials/footer';

class App extends React.Component {
  static propTypes = {
    payload: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.renderable
    ]).isRequired
  };

  state = {
    height: '500px'
  };

  componentDidMount() {
    // window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    // this.setState({height: window.innerHeight});
  }

  render() {
    return (
      <div className='container'>
        <Header {...this.props.payload} />
        <Home {...this.props} />
        <main role='application'>
          <div className='sub-nav'>
            <h1><Link to='/'>Caliparks</Link></h1>
          </div>
          <Explore {...this.props} />
          <Discover {...this.props} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
