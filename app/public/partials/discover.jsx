import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import { Link } from 'react-router';
import Dropdown from 'react-select';
import Color from 'color';
import { helpers, activities, colorGroups } from '../../constants/park-activities';
import {getTwoColumnWidth} from '../../constants/layout';

export default class Discover extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  };

  state = {
    navigationPosition: 0
  }

  componentWillMount() {

  }

  componentDidMount() {}

  logChange(val) {
    console.log('Selected: ' + val);
  }

  renderActivities(activityHeight) {
    const showOnly = [this.state.navigationPosition,  this.state.navigationPosition + 7];

    return activities.map((activity, idx) => {
      let klass = 'block activity col-six';
      const layoutPos = idx - this.state.navigationPosition;
      if (layoutPos % 2 === 0) {
        klass += ' new-row';
      }

      if (idx < showOnly[0] || idx >= showOnly[1]) {
        klass += ' hide';
      }
      const icon = helpers.iconprefix + activity.assetname;
      const thumb = helpers.imgpath + activity.assetname + '_rect.jpg';
      const color = Color(colorGroups[activity.clrGroup]);
      color.alpha(0.5);

      return (
        <li key={activity.assetname} className={klass} style={{height: activityHeight + 'px'}}>
          <div className='aspect-content' style={{backgroundImage: 'url(' + thumb + ')'}}>
            <Link className='activity-link' to={`/activity/${activity.assetname}`}>
            <div className='overlay' />
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

  getHeight() {
    return this.props.height || 700;
  }

  onActivityNavigationClick(dir) {
    let pos = 0;
    if (dir === 'less' && this.state.navigationPosition > 0) {
      if (this.state.navigationPosition - 7 < 0) {
        pos = 0;
      } else {
        pos = this.state.navigationPosition - 7;
      }

      this.setState({navigationPosition: pos });
    } else if (dir === 'more' && this.state.navigationPosition + 7 < activities.length) {
      if (this.state.navigationPosition + 7 > activities.length) {
        pos = activities.length - 7;
      } else {
        pos = this.state.navigationPosition + 7;
      }

      this.setState({navigationPosition: pos });
    }
  }

  activityNavigationEnabled(dir) {
    if (dir === 'less' && this.state.navigationPosition > 0) return false;
    if (dir === 'more' && this.state.navigationPosition + 7 < activities.length) return false;

    return true;
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

    const [leftWidth, rightWidth] = getTwoColumnWidth(this.props.width, 0);
    const availableHeight = (this.getHeight() - 98 - 5);
    const availableActivityHeight = (availableHeight + 5) - (4 * 5);
    const activityHeight = Math.floor(availableActivityHeight / 4);

    return (
      <div id='discover-section' style={{height: (this.getHeight() - 8) + 'px'}}>
        <div className='wrapper row height-full'>
          <div className='col-four' style={{width: leftWidth + 'px'}}>
            <div className='center-align-container'>
              <h4 className='uppercase'>Discover</h4>
              <p className='description'>Find out which parks to head to for your favorite activities.</p>

              <div className='dropdown-filter hide'>
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
          <div className='col-eight activity-blocks' style={{width: rightWidth + 'px'}}>
            <ul className='activity-blocks' style={{height: availableHeight + 'px'}}>
              {this.renderActivities(activityHeight)}
            </ul>
            <div className='block col-six activity-navigation' style={{height: activityHeight + 'px'}}>
              <div className='table'>
                <div className='table-cell no-text-selection'>
                  <button className='btn' disabled={this.activityNavigationEnabled('less')} onClick={this.onActivityNavigationClick.bind(this, 'less')}>&lt;</button><span>More</span><button className='btn' onClick={this.onActivityNavigationClick.bind(this, 'more')} disabled={this.activityNavigationEnabled('more')}>&gt;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='scroll-helper-arrow down'/>
      </div>
    );
  }

}
