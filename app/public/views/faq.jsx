import PureComponent from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {throttle} from 'lodash';
import { Link } from 'react-router';

import * as actions from '../actions';
import StickyNav from '../partials/sticky-nav';
import {faqs as FAQS} from '../../constants/faq';

const mapStateToProps = (state) => state;

export class Faq extends PureComponent {
  static propTypes = {};

  state = {};

  componentWillMount() {}

  componentDidMount() {
    this.anchors =  document.querySelectorAll('.anchors');
    // this.handleScrollThrottle = throttle(this.handleScroll, 100).bind(this);
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.handleResizeThrottled = throttle(this.handleResize, 250).bind(this);
    window.addEventListener('resize', this.handleResizeThrottled);
    this.handleResize();
  }

  componentWillReceiveProps(nextProps) {}

  componentDidUpdate() {}

  componentWillUnmount() {
    this.props.clearSelectedActivityData(this.props.params.activity);
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

  handleResize() {
    this.props.setWindowSize(this.getWindowDimensions());
  }

  setScrollContainerHeight() {}

  handleScroll() {
    [].forEach.call(this.anchors, (elm) => {
      const top = window.pageYOffset;
      const distance = top - elm.offsetTop;
      const hash = elm.getAttribute('name');
      if (distance < 30 && distance > -30 && this.currentHash !== hash) {
        if (typeof history !== 'undefined' && history.replaceState) {
          history.replaceState(null, null, '#' + hash);
        } else {
          location.hash = '#' + hash;
        }
        this.currentHash = hash;
      }
    });
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  render() {
    console.log(this.props.viewData.header.length);
    return (
      <div id='faq-section' className='container'>
        <main className='theme-white page-park' role='application'>
          <StickyNav />
          <div className='table'>
            <div className='table-cell'>
              <div className='faq-items'>
                <h3>FAQ</h3>
                <ul className='faq-menu plain'>
                  {FAQS.map((faq) => {
                    return <li><a href={'#' + faq.anchor}>{faq.title}</a></li>;
                  })}
                </ul>
                <ul className='faq-content plain'>
                  {FAQS.map((faq) => {
                    return <li>
                    <a name={faq.anchor} className='anchors'></a>
                    <div>
                      <h5><Link to='/faq' onClick={this.scrollToTop.bind(this)}>{faq.title}</Link></h5>
                      <div dangerouslySetInnerHTML={{__html: faq.content}} />
                    </div>
                    </li>;
                  })}
                </ul>
              </div>
            </div>

            <div className='table-cell faq-images'>
              <ul className='plain'>
                {this.props.viewData.header.map((img) => {
                  return <li style={{backgroundImage: 'url(' + img + ')'}} />;
                })}
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export const FaqContainer = connect(mapStateToProps, actions)(Faq);
