import React, {PropTypes} from 'react';
import LocaleSwitcher from '../components/localeSwitcher';

class Footer extends React.Component {

  static propTypes = {
    lang: PropTypes.string.isRequired
  };

  componentDidMount() { }

  render() {
    return (
      <footer id='footer' className='row footer theme-white'>
        <div className='col-nine'>
          <div className='table'>
            <div className='table-cell'>
              <a className='inline-block' href=''>
                <svg className='icon stamen'>
                  <use xlinkHref='main.svg#logo-stamen' />
                </svg>
              </a>
            </div>

            <div className='table-cell'>
              <a className='inline-block' href=''>
                <svg className='icon green-info'>
                  <use xlinkHref='main.svg#logo-green-info' />
                </svg>
              </a>
            </div>

            <div className='table-cell'>
              <a className='inline-block' href=''>
                <svg className='icon parks-forward'>
                  <use xlinkHref='main.svg#logo-parks-forward' />
                </svg>
              </a>
            </div>

            <div className='table-cell'>
              <a className='inline-block' href=''>
                <svg className='icon resource-fund'>
                  <use xlinkHref='main.svg#logo-resource-fund' />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className='col-three footer-actions'>
          <div className='table'>
            <div className='table-cell'>
              <LocaleSwitcher current={this.props.lang} className='btn uppercase'/>
            </div>
            <div className='table-cell'><button className='btn uppercase'>feedback</button></div>
          </div>
        </div>
      </footer>
    );
  }

}

export default Footer;
