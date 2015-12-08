import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import {FormattedMessage, injectIntl} from 'react-intl';
import { Link } from 'react-router';
import Color from 'color';
import { helpers, activities, colorGroups } from '../../constants/park-activities';
import {getTwoColumnWidthPercent} from '../../constants/layout';

class Discover extends PureComponent {
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

  renderActivities(activityHeight) {
    const showOnly = [this.state.navigationPosition,  this.state.navigationPosition + 7];
    const {formatMessage} = this.props.intl;

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
      const name = helpers.title(activity.assetname, formatMessage);
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
                <div className='table-cell activity-name'>{name}</div>
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
    const [leftWidth, rightWidth] = getTwoColumnWidthPercent(this.props.width, 0);
    const availableHeight = (this.getHeight() - 98 - 5);
    const availableActivityHeight = (availableHeight + 5) - (4 * 5);
    const activityHeight = Math.floor(availableActivityHeight / 4);

    return (
      <div id='discover-section' style={{height: (this.getHeight() - 8) + 'px'}}>
        <div className='wrapper row height-full'>
          <div className='col-four' style={{width: leftWidth + '%'}}>
            <div className='center-align-container'>
              <h4 className='uppercase'>
                <FormattedMessage
                  id='discover'
                  defaultMessage='Discover' />
              </h4>
              <p className='description'>
                <FormattedMessage
                  id='discover.section.message'
                  defaultMessage={`Find out which parks to head to for your favorite activities.`} />
              </p>
            </div>
          </div>
          <div className='col-eight activity-blocks' style={{width: rightWidth + '%'}}>
            <ul className='activity-blocks' style={{height: availableHeight + 'px'}}>
              {this.renderActivities(activityHeight)}
            </ul>
            <div className='block col-six activity-navigation' style={{height: activityHeight + 'px'}}>
              <div className='table'>
                <div className='table-cell no-text-selection'>
                  <button className='btn' disabled={this.activityNavigationEnabled('less')} onClick={this.onActivityNavigationClick.bind(this, 'less')}>&lt;</button>
                  <FormattedMessage
                    id='discover.section.more'
                    defaultMessage='More' />
                  <button className='btn' onClick={this.onActivityNavigationClick.bind(this, 'more')} disabled={this.activityNavigationEnabled('more')}>&gt;</button>
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

export default injectIntl(Discover);
