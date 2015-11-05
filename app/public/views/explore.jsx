import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import Dropdown from 'react-select';
import GoogleMap from 'google-map-react';

export default class Explore extends PureComponent {
  static propTypes = {
    height: PropTypes.number
  };

  getHeight() {
    return this.props.height || 700;
  }

  logChange(val) {
    console.log('Selected: ' + val);
  }

  render() {
    const options = [
      { value: 'today', label: 'Today' },
      { value: 'yesterday', label: 'Yesterday' },
      { value: 'week-now', label: 'This week' },
      { value: 'week-last', label: 'Last week' },
      { value: 'month-now', label: 'This month' },
      { value: 'month-last', label: 'Last month' },
      { value: 'season-now', label: 'This season' },
      { value: 'season-last', label: 'Last season' },
      { value: 'year-now', label: 'This year' },
      { value: 'year-last', label: 'Last year' }
    ];

    return (
      <div id='explore' name='explore' className='row theme-white' style={{height: this.getHeight() + 'px'}}>
        <div className='col-four'>
          <div className='center-align-container'>
            <h4 className='uppercase'>Explore</h4>
            <p className='description'>Photos pour out of our parks daily. See what’s happening and where.</p>

            <div className='dropdown-filter'>
              <p className='label uppercase'>Showing top 10 parks</p>
              <Dropdown
                className='dropdown'
                name='park-top-ten-picker'
                value='week-now'
                options={options}
                clearable={false}
                onChange={this.logChange} />
            </div>
          </div>
        </div>
        <div className='col-eight'>
          <GoogleMap
            center={{lat: 37.735969, lng: -121.640625}}
            zoom={6}
            options = {{
              scrollwheel: false
            }} />
        </div>
      </div>
    );
  }
}
