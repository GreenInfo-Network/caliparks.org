import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import LocaleSwitcher from '../components/localeSwitcher';
import {FormattedMessage} from 'react-intl';

export default class Footer extends PureComponent {
  static propTypes = {
    lang: PropTypes.string.isRequired
  };

  componentDidMount() { }

  getLang() {
    return this.props.lang;
  }

  render() {
    return (
      <footer id='footer-section' className='row footer theme-white'>
        <div className='col-three footer-actions'>
          <div className='table'>
            <div className='table-cell'>
              <LocaleSwitcher current={this.getLang()} className='btn uppercase'/>
            </div>
            <div className='table-cell'>
              <a href='/faq' className='btn uppercase'>
                <FormattedMessage
                  id='footer.faq'
                  defaultMessage='FAQ'
                />
              </a>
            </div>
            <div className='table-cell'>
              <a href='mailto:parks@stamen.com' className='btn uppercase' data-uv-trigger>
                <FormattedMessage
                  id='footer.feedback'
                  defaultMessage='Feedback'
                />
              </a>
            </div>
          </div>
        </div>

        <div className='col-nine footer-logos'>
          <div className='table'>

            <div className='table-cell'>
              <a className='inline-block' href='http://www.stamen.com/' target='_blank'>
                <svg className='icon stamen'>
                  <use xlinkHref='/main.svg#logo-stamen' />
                </svg>
              </a>
            </div>

            <div className='table-cell'>
              <a className='inline-block' href='http://www.greeninfo.org/' target='_blank'>
                <svg className='icon green-info'>
                  <use xlinkHref='/main.svg#logo-green-info' />
                </svg>
              </a>
            </div>

            <div className='table-cell'>
              <a className='inline-block' href='http://www.parksforward.com/' target='_blank'>
                <svg className='icon parks-forward'>
                  <use xlinkHref='/main.svg#logo-parks-forward' />
                </svg>
              </a>
            </div>

            <div className='table-cell'>
              <a className='inline-block' href='http://www.resourceslegacyfund.org/' target='_blank'>
                <svg className='icon resource-fund'>
                  <use xlinkHref='/main.svg#logo-resource-fund' />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </footer>
    );
  }
}
