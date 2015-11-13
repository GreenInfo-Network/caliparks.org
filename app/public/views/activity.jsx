import {Map} from 'immutable';
import PureComponent from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {throttle} from 'lodash';
import * as actions from '../actions';

import StickyNav from '../partials/sticky-nav';
import ParkMap from '../components/parkMap';
import { helpers } from '../../constants/park-activities';


function mapStateToProps(state) {
  // NOTE: this may or may not be an Immutable JS object
  return Map(state).toJS();
}

export class Activity extends PureComponent {
  static propTypes = {
    params: PropTypes.shape({
      activity: PropTypes.string.isRequired
    }).isRequired,
    selectedActivity: PropTypes.shape({
      parks: PropTypes.array.isRequired
    }).isRequired,
    windowSize: PropTypes.object,
    setWindowSize: PropTypes.func,
    clearSelectedActivityData: PropTypes.func,
    fetchSelectedActivity: PropTypes.func
  };

  state = {
    selectedMarker: 0
  };

  componentWillMount() {}

  componentDidMount() {
    this.handleResizeThrottled = throttle(this.handleResize, 250).bind(this);
    window.addEventListener('resize', this.handleResizeThrottled);
    this.handleResize();

    if (!this.props.selectedActivity.isFetching) {
      if (Map(this.props.selectedActivity.parks).isEmpty()) {
        this.props.fetchSelectedActivity(this.props.params.activity);
      } else if (this.props.selectedActivity.activity !== this.props.params.activity) {
        this.props.fetchSelectedActivity(this.props.params.activity);
      }
    }
  }

  componentDidUpdate() {
    this.setScrollContainerHeight();
  }

  componentWillUnmount() {
    this.props.clearSelectedActivityData(this.props.params.id);
    window.removeEventListener('resize', this.handleResizeThrottled);
  }

  getWindowDimensions() {
    // Need to make sure we have a window due to
    // server rendering...
    if (typeof window === 'undefined') return {width: 0, height: 0};

    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  getHeight() {
    if (this.props.windowSize.height) {
      return this.props.windowSize.height - 76;
    }

    return 700;
  }

  getHalfHeight() {
    const h = this.getHeight();
    return Math.round(h / 2) + 'px';
  }

  setScrollContainerHeight() {
    if (!this.refs.parklist) return;
    const elm = ReactDOM.findDOMNode(this.refs.parklist);
    elm.style.height = (this.props.windowSize.height - elm.offsetTop - 40) + 'px';
  }

  setMarkerIcon(marker, idx) {
    // circle icon path generator:
    // http://complexdan.com/svg-circleellipse-to-path-converter/
    const icon = {
      scale: 1,
      fillOpacity: 1,
      strokeOpacity: 1
    };

    if (idx === this.state.selectedMarker) {
      icon.path = 'M-8,0a8,8 0 1,0 16,0a8,8 0 1,0 -16,0';
      icon.fillColor = '#ffffff';
      icon.strokeColor = '#358292';
      icon.strokeWeight = 4;
    } else {
      icon.path = 'M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0';
      icon.fillColor = '#358292';
      icon.strokeColor = '#358292';
      icon.strokeWeight = 0;
    }
    return icon;
  }

  setMarkerId(marker, idx) {
    return marker.su_id;
  }

  setMarkerPosition(marker, idx) {
    return {lat: marker.centroid.coordinates[1], lng: marker.centroid.coordinates[0]};
  }

  handleResize() {
    this.props.setWindowSize(this.getWindowDimensions());
  }

  render() {
    const icon = helpers.iconprefix + this.props.params.activity;
    return (
      <div id='activity' className='container'>
        <main className='page-activity' role='application'>
          <StickyNav className='alt' />
          <div className='row content' style={{height: this.getHeight() + 'px'}}>
            <div className='col-four'>
              <div className='activity-hero'>
                <img src={'/assets/images/activities/' + this.props.params.activity + '_square.jpg'} />
                <div className='activity-logo'>
                  <svg className={'icon alt large park-activity ' + this.props.params.activity}>
                    <use xlinkHref={icon} />
                  </svg>
                  <Link to='/' hash='#discover'>Back to activities</Link>
                </div>
              </div>

              <div className='inset'>
                <h4 className='title uppercase'>{helpers.title(this.props.params.activity)}</h4>

                <ul ref='parklist' className='park-list'>
                {this.props.selectedActivity.parks.map((park, index) => {
                  return (
                    <li key={park.su_id} ref={park.su_id} className={(this.state.selectedMarker === index) ? 'selected' : ''}>{park.su_name}</li>
                  );
                })}
                </ul>
              </div>
            </div>
            <div className='col-eight map-wrap'>
              <ParkMap
                markers={this.props.selectedActivity.parks}
                selectedMarker={this.state.selectedMarker}
                setMarkerIcon={this.setMarkerIcon.bind(this)}
                setMarkerId={this.setMarkerId.bind(this)}
                setMarkerPosition={this.setMarkerPosition.bind(this)}/>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export const ActivityContainer = connect(mapStateToProps, actions)(Activity);
