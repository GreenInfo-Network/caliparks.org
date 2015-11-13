import React from 'react';
import PureComponent from 'react-pure-render/component';
import { Link } from 'react-router';
import Dropdown from 'react-select';
import Color from 'color';
import { helpers, activities, colorGroups } from '../../constants/park-activities';

export default class Discover extends PureComponent {

  componentDidMount() { }

  logChange(val) {
    console.log('Selected: ' + val);
  }

  renderActivities() {
    return activities.map((activity, idx) => {
      let klass = 'block activity col-four';
      if (idx === 4 || (idx > 4 && (idx - 4) % 3 === 0)) {
        klass += ' new-row';
      }

      const icon = helpers.iconprefix + activity.assetname;
      const thumb = helpers.imgpath + activity.assetname + '_rect.jpg';
      const color = Color(colorGroups[activity.clrGroup]);
      color.alpha(0.5);

      return (
        <li key={activity.assetname} className={klass}>
          <div className='aspect-content'>
            <Link className='activity-link' to={`/activity/${activity.assetname}`}>
            <div className='overlay' />
            <img src={thumb} />
            <div className='label-wrap' style={{background: color.rgbString()}}>
              <div className='label table'>
                <div className='table-cell activity-icon'>
                  <svg className={'icon park-activity ' + activity.assetname}>
                    <use xlinkHref={icon} />
                  </svg>
                </div>
                <div className='table-cell activity-name'>{activity.name}</div>
              </div>
            </div>
            </Link>
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
                <div className='aspect-content'>
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
                        clearable={false}
                        onChange={this.logChange} />
                    </div>
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
