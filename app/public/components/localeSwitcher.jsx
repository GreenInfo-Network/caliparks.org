import React, { Component, PropTypes } from 'react';
import {write as CookieWriter} from '../lib/cookies';
import Config from '../../config';

class LocaleSwitcher extends Component {
  static propTypes = {
    current: PropTypes.string.isRequired
  };

  handleLocaleClick(locale, evt) {
    evt.preventDefault();
    CookieWriter(Config.locales.cookie, locale, 365);
    window.location.reload();
  }

  makeLocaleLink(locale) {
    const { current } = this.props;

    let className = '';
    if (locale === current) {
      className = 'active';
    }

    const localeName = Config.locales.available[locale];

    return (
      <a key={ locale }
         className={ className }
         onClick={ this.handleLocaleClick.bind(this, locale) }
         href={ `?hl=${locale}` }>
          { localeName }
      </a>
    );
  }

  render() {
    const locales = Object.keys(Config.locales.available);

    return (
      <div className='locale-switcher'>
        { locales.map(this.makeLocaleLink, this) }
      </div>
    );
  }
}

export default LocaleSwitcher;
