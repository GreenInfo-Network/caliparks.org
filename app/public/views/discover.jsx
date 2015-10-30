import React from 'react';
import Dropdown from 'react-select';
import { helpers, activities } from '../../constants/park-activities';

class Discover extends React.Component {

  componentDidMount() { }

  logChange(val) {
    console.log('Selected: ' + val);
  }

  renderActivities() {
    return activities.map((activity) => {
      const icon = helpers.iconprefix + activity.assetname;
      const thumb = helpers.imgpath + activity.assetname + '_rect.jpg';

      return (
        <li key={activity.assetname} className='block col-four'>
          <img src={thumb} />
          <div className='label table'>
            <div className='table-cell activity-icon'>
              <svg className='icon park-activity'>
                <use xlinkHref={icon} />
              </svg>
            </div>
            <div className='table-cell activity-name'>{activity.name}</div>
          </div>
        </li>
      );
    });
  }

  render() {
    const options = [
        { value: 'popular', label: 'Most popular' },
        { value: 'land-rec', label: 'Land recreation' },
        { value: 'water-rec', label: 'Water recreation' },
        { value: 'winter-rec', label: 'Winter recreation' },
        { value: 'sports', label: 'Sports' },
        { value: 'attractions', label: 'Cultural attractions' },
        { value: 'family', label: 'Family-friendly' }
    ];
    return (
      <section id='discover' className='row'>
        <div className='col-twelve blocks'>
          <div className='row'>
            <ol>
              <li className='col-four block hero'>
                <div className='center-align-container'>
                  <h4 className='uppercase'>Discover</h4>
                  <p className='description'>Find out which parks to head to for your favorite activities.</p>

                  <div className='dropdown-filter'>
                    <p className='label uppercase'>Sorting activities by</p>
                    <Dropdown
                      className='dropdown'
                      name='park-activity-sorter'
                      value='popular'
                      options={options}
                      onChange={this.logChange} />
                  </div>
                </div>
              </li>
              {this.renderActivities()}
            </ol>
          </div>
        </div>
      </section>
    );
  }

}

export default Discover;
