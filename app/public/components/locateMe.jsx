import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import request from 'superagent';
import PIP from 'point-in-polygon';

const loadJSONP = (function() {
  let unique = 0;
  return (urlRaw, context, callback) => {
    let url = urlRaw || '';
    // INIT
    const name = '_jsonp_' + unique++;
    if (url.match(/\?/)) {
      url += '&callback=' + name;
    } else {
      url += '?callback=' + name;
    }

    // Create script
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Setup handler
    window[name] = function(data) {
      callback.call((context || window), data);
      document.getElementsByTagName('head')[0].removeChild(script);
      script = null;
      delete window[name];
    };

    // Load JSON
    document.getElementsByTagName('head')[0].appendChild(script);
  };
})();

export default class LocateMe extends PureComponent {
  constructor() {
    super();
    this.state = {
      isSearching: false,
      location: null,
      alertMsg: null
    };

    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.locate = this.locate.bind(this);

    this.restrictionGeoJSON = null;
  }

  static propTypes = {
    onPosition: PropTypes.func,
    allowFallback: PropTypes.bool,
    restrictWith: PropTypes.string
  }

  static defaultProps = {
    allowFallback: true
  }

  componentWillMount() {
    const {restrictWith} = this.props;
    if (restrictWith) {
      this.loadRestrictionGeoJSON();
    }
  }

  componentDidMount() {}

  componentDidUpdate() {}

  loadRestrictionGeoJSON() {
    const {restrictWith} = this.props;
    const that = this;

    request
      .get(restrictWith)
      .end((err, res) => {
        if (err) {
          console.error('Could not load restriction bounds! Restriction checks will be aborted.', err);
        } else {
          that.restrictionGeoJSON = JSON.parse(res.text);
        }
      });
  }

  checkLocation(lat, lng) {
    let inside = false;
    const loc = [lng, lat];

    this.restrictionGeoJSON.features.forEach((feature) => {
      if (inside) return;

      feature.geometry.coordinates.forEach((poly) => {
        poly.forEach((coords) => {
          if (PIP(loc, coords)) inside = true;
        });
      });
    });

    return inside;
  }

  locate() {
    if (this.state.isSearching) return;
    const {allowFallback} = this.props;

    this.setState({isSearching: true});
    if (!navigator.geolocation) {
      if (allowFallback) {
        this.fallback();
      } else {
        this.onError();
      }
    } else {
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    }
  }

  finalize(loc, alertMsg) {
    if (typeof this.props.onPosition === 'function') {
      this.props.onPosition(loc);
    }

    this.setState({isSearching: false, location: loc, alertMsg: alertMsg || null});
  }

  onSuccess(position) {
    let location = [];
    const {restrictWith} = this.props;
    if (position.coords) { // HTML5
      location.push(position.coords.latitude);
      location.push(position.coords.longitude);
    } else if (position.latitude && position.longitude) { // fallback
      location.push(position.latitude);
      location.push(position.longitude);
    }

    if (location.length !== 2) return this.onError();

    if (restrictWith && this.restrictionGeoJSON) {
      location = (this.checkLocation(location[1], location[0])) ? location : null;

      if (location === null) return this.outsideBounds();
    }

    this.finalize(location);
  }

  onError() {
    this.finalize(null, 'No location found.');
  }

  outsideBounds() {
    this.finalize(null, 'Location outside area.');
  }

  fallback() {
    loadJSONP('//freegeoip.net/json/', this, this.onSuccess.bind(this));
  }

  closeAlert() {
    this.setState({alertMsg: null});
  }

  render() {
    const {isSearching, alertMsg} = this.state;
    const klass = isSearching ? ' searching' : '';

    const msgKlass = alertMsg ? '' : ' hide';

    return (
      <div className={'locate-me' + klass}>
        <div className={'locate-me__msg' + msgKlass}>
          <button className='locate-me__close btn link' onClick={this.closeAlert.bind(this)}>×</button>
          <span>{alertMsg}</span>
        </div>
        <button className='locate-me__activator btn' onClick={this.locate}><span/></button>
      </div>
    );
  }
}
