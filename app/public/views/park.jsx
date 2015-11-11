import React, {PropTypes} from 'react';
import StickyNav from '../partials/sticky-nav';

export default class Park extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    console.log(this.props.selectedPark);

    return (
      <div className='container'>
        <main role='application'>
          <StickyNav />
          <h3>Park: {this.props.params.id}</h3>
        </main>
      </div>
    );
  }
}
