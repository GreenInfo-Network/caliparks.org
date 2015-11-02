import React, { Component, PropTypes } from 'react';
import {write as CookieWriter} from '../lib/cookies';
import Config from '../../config';

class LocaleSwitcher extends Component {
  static propTypes = {
    current: PropTypes.string.isRequired,
    renderer: PropTypes.func,
    className: PropTypes.string
  };

  handleLocaleClick(locale, evt) {
    evt.preventDefault();
    CookieWriter(Config.locales.cookie, locale, 365);
    window.location.reload();
  }

  makeLocaleLinks() {
    const locales = Object.keys(Config.locales.available);

    if (this.props.renderer &&
      this.props.renderer === 'function') return this.props.renderer(locales);

    return locales.map((locale) => {
      const { current } = this.props;

      let klass = '';
      if (locale === current) {
        klass = 'active';
      }

      if (this.props.className) {
        klass += ' ' + this.props.className;
      }

      const localeName = Config.locales.available[locale];

      return (
        <a key={ locale }
           className={ klass }
           onClick={ this.handleLocaleClick.bind(this, locale) }
           href={ `?hl=${locale}` }>
            { localeName }
        </a>
      );
    });
  }

  render() {
    return (
      <div className='locale-switcher'>
        { this.makeLocaleLinks() }
      </div>
    );
  }
}

export default LocaleSwitcher;
