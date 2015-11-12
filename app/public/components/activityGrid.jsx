import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import {activities as Activities} from '../../constants/park-activities';

export default class ActivityGrid extends PureComponent {
  static propTypes = {
    activities: PropTypes.array
  }

  static defaultProps = {
    activities: []
  }

  componentDidMount() {}

  componentDidUpdate() {}

  getTitle(activity) {
    const result = Activities.filter((row) =>{
      return row.assetname === activity;
    });

    if (result.length) return result[0].name;
    return activity;
  }

  render() {
    return (
      <div className='activity-grid'>
        {this.props.activities.map((activity, index) => {
          const cleaned = activity.split(' ').join('_');
          return (
            <button key={index} className='btn' title={this.getTitle(cleaned)}>
              <svg className={'icon park-activity alt ' + cleaned}>
                <use xlinkHref={'/main.svg#activity-' + cleaned} />
              </svg>
            </button>
          );
        })}
      </div>
    );
  }
}
