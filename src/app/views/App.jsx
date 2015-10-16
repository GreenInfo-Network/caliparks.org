import React, {
  Component,
  PropTypes
} from 'react';
import { RouteHandler } from 'react-router';
import Layout from './Layout.jsx';
import Header from  '../components/Header.jsx';

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
    //this.state = { viewdata: this.props.viewdata };
  }

  render() {
    console.log(this.props);
    return (
      <Layout {...this.props }>
        <Header {...this.props}/>
        <main role='application'>
          <RouteHandler {...this.props}/>
        </main>
      </Layout>
    );
  }

}
