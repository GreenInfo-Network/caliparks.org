import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import { Link } from 'react-router';
import {helpers} from '../../constants/park-activities';

export default class ActivityGrid extends PureComponent {
  static propTypes = {
    activities: PropTypes.array
  }

  static defaultProps = {
    activities: []
  }

  componentDidMount() {}

  componentDidUpdate() {}

  renderActivities() {
    if (!this.props.activities) return (<h5 className='error'>No activities!</h5>);
    const {formatMessage} = this.props.intl;

    return this.props.activities.map((activity, index) => {
      const sanitized = helpers.sanitize(activity);
      return (
        <Link key={index} className='link' to={`/activity/${sanitized}`}>
        <button className='btn' title={helpers.title(activity, formatMessage)}>
          <svg className={'icon park-activity alt ' + sanitized}>
            <use xlinkHref={helpers.iconURL(activity)} />
          </svg>
        </button>
        </Link>
      );
    });
  }

  render() {
    return (
      <div className='activity-grid'>
        {this.renderActivities()}
      </div>
    );
  }
}
