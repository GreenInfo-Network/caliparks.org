import React, {Component, PropTypes} from 'react';
import Router from 'react-router';
import Layout from './layout.jsx';
import Header from '../components/header.jsx';

export default class App extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    viewdata: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]).isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout {...this.props}>
        <Header {...this.props}/>
        <main role='application'>
          <Router.RouteHandler {...this.props}/>
        </main>
      </Layout>
    );
  }
}
