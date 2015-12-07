import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import {
  default as canUseDOM,
} from 'can-use-dom';

export default class UserVoice extends PureComponent {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.scriptAdded = false;
  }

  componentDidMount() {
    this.addScript();
  }

  componentDidUpdate() {}

  addScript() {
    if (!canUseDOM) {
      return;
    }

    if (this.scriptIsAdded) return;

    this.scriptIsAdded = true;
    window.UserVoice = window.UserVoice || [];
    const el = document.createElement('script');
    const s = document.getElementsByTagName('script')[0];

    el.type = 'text/javascript';
    el.async = true;
    el.src = '//widget.uservoice.com/SBdNbIk3usaPHLZ8ARrfbQ.js';
    s.parentNode.insertBefore(el, s);

    window.UserVoice.push(['set', {
      accent_color: '#448dd6',
      trigger_color: 'white',
      trigger_background_color: 'rgba(46, 49, 51, 0.6)',
      target: document.body,
      position: 'top-left'
    }]);
  }

  render() {
    return React.DOM.script(null);
  }
}
