import React, {PropTypes} from 'react';
import Header from '../components/header.jsx';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.renderable
    ]).isRequired
  };

  render() {
    return (
      <div className='container'>
      <Header {...this.props} />
      <main role='application'>
        { this.props.children }
      </main>
      </div>
    );
  }
}

export default App;
