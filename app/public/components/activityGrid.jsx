import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';

export default class ActivityGrid extends PureComponent {
  static propTypes = {
    activities: PropTypes.array
  }

  static defaultProps = {
    activities: []
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <div>
        {this.props.activities.map((activity, index) => {
          return (
            <button key={index} className='btn'>
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
