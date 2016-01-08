import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import {
  default as canUseDOM,
} from 'can-use-dom';

export default class GoogleAnalytics extends PureComponent {
  static propTypes = {
    trackingID: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.scriptAdded = false;
  }

  componentDidMount() {
    this.addScript();
  }

  componentDidUpdate() {
    if (!this.scriptIsAdded) this.addScript();
  }

  addScript() {
    const {trackingID} = this.props;
    if (!trackingID || !canUseDOM || this.scriptIsAdded) return;

    this.scriptIsAdded = true;

    window.ga = window.ga || function() {(window.ga.q = window.ga.q || []).push(arguments);};
    window.ga.l = +new Date;
    window.ga('create', trackingID, 'auto');
    window.ga('send', 'pageview');

    const el = document.createElement('script');
    const s = document.getElementsByTagName('script')[0];

    el.type = 'text/javascript';
    el.async = true;
    el.src = '//www.google-analytics.com/analytics.js';
    s.parentNode.insertBefore(el, s);
  }

  render() {
    return React.DOM.script(null);
  }
}
