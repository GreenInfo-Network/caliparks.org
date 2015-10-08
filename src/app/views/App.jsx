import React, {
  Component,
  PropTypes
} from 'react';
import { RouteHandler, Link } from 'react-router';
import Layout from './Layout.jsx';

export default class App extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    viewdata: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { viewdata: this.props.viewdata };
  }

  render() {
    return (
      <Layout {...this.props }>
        <header>
          <h1>{ this.props.title }</h1>
        </header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/park'>Park</Link></li>
            <li><Link to='/about'>About</Link></li>
          </ul>
        </nav>
        <main role='application'>
          <RouteHandler {...this.props}/>
        </main>
      </Layout>
    );
  }

}
