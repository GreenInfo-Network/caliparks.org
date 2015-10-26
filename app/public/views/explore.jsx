import React, {PropTypes} from 'react';
import api from '../../services/xhr.js';

class Explore extends React.Component {

  static propTypes = {
    viewdata: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]).isRequired
  };

  componentDidMount() {
    const data = this.props.payload.viewdata;
    if (!data.stories || data.stories.length === 0) {
      api.get('stories', {}).then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
    }
  }

  render() {
    return (
      <section className='sub-view'>
        <h1>Explore</h1>
      </section>
    );
  }

}

export default Explore;

