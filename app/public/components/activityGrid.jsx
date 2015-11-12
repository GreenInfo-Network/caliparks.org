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
          return (
            <button key={index} className='btn' title={this.getTitle(activity)}>
              <svg className={'icon park-activity alt ' + activity}>
                <use xlinkHref={'/main.svg#activity-' + activity} />
              </svg>
            </button>
          );
        })}
      </div>
    );
  }
}
