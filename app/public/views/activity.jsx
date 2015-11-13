import {Map} from 'immutable';
import PureComponent from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {throttle} from 'lodash';
import * as actions from '../actions';

import StickyNav from '../partials/sticky-nav';
import {GoogleMap, Marker} from 'react-google-maps';
import CustomTileLayer from '../components/customTileLayer';
import GmapControls from '../components/gmapControls';
import { helpers} from '../../constants/park-activities';


function mapStateToProps(state) {
  // NOTE: this may or may not be an Immutable JS object
  return Map(state).toJS();
}

export class Activity extends PureComponent {
  static propTypes = {
    params: PropTypes.shape({
      activity: PropTypes.string.isRequired
    }).isRequired,
    windowSize: PropTypes.object,
    setWindowSize: PropTypes.func
  };


  componentWillMount() {}

  componentDidMount() {
    this.handleResizeThrottled = throttle(this.handleResize, 250).bind(this);
    window.addEventListener('resize', this.handleResizeThrottled);
    this.handleResize();
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeThrottled);
  }

  handleResize() {
    this.props.setWindowSize(this.getWindowDimensions());
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

  render() {
    console.log(this.props);

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
                  <Link to='/'>Back to activities</Link>
                </div>
              </div>

              <h4>{this.props.params.activity}</h4>


            </div>
            <div className='col-eight map-wrap'>
              <GoogleMap containerProps={{
                style: {
                  height: '100%',
                },
              }}
                defaultZoom={6}
                defaultCenter={{lat: 37.735969, lng: -121.640625}}
                defaultOptions={{
                  streetViewControl: false,
                  scrollwheel: false,
                  mapTypeControl: false,
                  zoomControl: false
                }}>
                <GmapControls {...this.props} />
                <CustomTileLayer tileUrl='http://{s}.map.parks.stamen.com/{z}/{x}/{y}{r}.png' {...this.props} />
              </GoogleMap>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export const ActivityContainer = connect(mapStateToProps, actions)(Activity);
