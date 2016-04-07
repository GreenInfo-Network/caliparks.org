import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import {FormattedMessage, injectIntl} from 'react-intl';
import { Link } from 'react-router';
import Color from 'color';
import { helpers, activities, colorGroups } from '../../constants/park-activities';

import {MOBILE_BREAKPOINT} from '../../constants/layout';
import {getTwoColumnWidthPercent} from '../../constants/layout';

class Discover extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  };

  state = {
    navigationPosition: 0
  };

  componentWillMount() {

  }

  componentDidMount() {
    this.resizeSections();
  }

  componentDidUpdate(prevProps) {
    this.resizeSections();
  }

  renderActivities(activityHeight) {
    const {navigationPosition} = this.state;
    const {width} = this.props;
    const {formatMessage} = this.props.intl;

    const showOnly = (width < MOBILE_BREAKPOINT) ?
      [navigationPosition, navigationPosition + 1] :
      [navigationPosition,  navigationPosition + 7];

    return activities.map((activity, idx) => {
      let klass = 'block activity col-six';
      const layoutPos = idx - navigationPosition;
      if (layoutPos % 2 === 0) {
        klass += ' new-row';
      }

      if (idx < showOnly[0] || idx >= showOnly[1]) {
        klass += ' hide';
      }
      const icon = helpers.iconprefix + activity.assetname;
      const thumb = (width < MOBILE_BREAKPOINT) ? helpers.imageURL(activity.assetname, 'square') : helpers.imageURL(activity.assetname);
      const color = Color(colorGroups[activity.clrGroup]).alpha(0.5);
      const name = helpers.title(activity.assetname, formatMessage);
      const height = (width < MOBILE_BREAKPOINT) ? '100%' : activityHeight + 'px';

      return (
        <li key={activity.assetname} className={klass} style={{height: height}}>
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
    const h = this.props.height || 700;
    return h - 8;
  }

  resizeSections() {
    const {sideleft, sideright} = this.refs;
    if (sideleft && sideright) {
      if (this.props.width < MOBILE_BREAKPOINT) {
        const height = this.getHeight();

        sideleft.style.height = 'auto';

        const leftHeight = sideleft.offsetHeight + 20;

        sideleft.style.height = leftHeight + 'px';
        sideright.style.height = (height - leftHeight - sideleft.offsetTop - 5) + 'px';
      } else {
        sideright.style.height = sideleft.style.height = '100%';
      }
    }
  }

  onActivityNavigationClick(dir) {
    const {navigationPosition} = this.state;
    const {width} = this.props;
    const step = (width < MOBILE_BREAKPOINT) ? 1 : 7;
    let pos = 0;

    if (dir === 'less' && navigationPosition > 0) {
      if (navigationPosition - step < 0) {
        pos = 0;
      } else {
        pos = navigationPosition - step;
      }

      this.setState({navigationPosition: pos });
    } else if (dir === 'more' && navigationPosition + step < activities.length) {
      if (navigationPosition + step > activities.length) {
        pos = activities.length - step;
      } else {
        pos = navigationPosition + step;
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
    const availableHeight = this.getHeight();
    const availableActivityHeight = (availableHeight - 76 - 10) - (4 * 5);
    const activityHeight = Math.floor(availableActivityHeight / 4);

    const activitiesBlockHoverable = (this.props.width < MOBILE_BREAKPOINT) ? ' hoverable' : '';

    return (
      <div id='discover-section' style={{height: availableHeight + 'px'}}>
        <div className='wrapper row height-full'>
          <div ref='sideleft' className='col-four' style={{width: leftWidth + '%'}}>
            <div className='center-align-container'>
              <h4 className='uppercase'>
                <FormattedMessage
                  id='discover'
                  defaultMessage='Discover' />
              </h4>
              <p className='description'>
                <FormattedMessage
                  id='discover.section.message'
                  defaultMessage={`Find out which California parks to head to for your favorite activities.`} />
              </p>
            </div>
          </div>
          <div ref='sideright' className='col-eight activity-blocks' style={{width: rightWidth + '%'}}>

            <ul className={'activity-blocks no-text-selection' + activitiesBlockHoverable} style={{height: '100%'}}>
              {this.renderActivities(activityHeight)}
              <button className='slick-prev' disabled={this.activityNavigationEnabled('less')} onClick={this.onActivityNavigationClick.bind(this, 'less')}/>
              <button className='slick-next' disabled={this.activityNavigationEnabled('more')} onClick={this.onActivityNavigationClick.bind(this, 'more')}/>
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
