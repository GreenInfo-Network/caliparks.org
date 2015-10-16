import React, { PropTypes } from 'react';
import Slider from './Slider.jsx';
import Nav from './Nav.jsx';

class Header extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    viewdata: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]).isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() { }

  getHeaderContent() {
    const isHome = (this.props.view === 'home') ? true : false;
    if (isHome) {
      return (
        <header>
          <div className='pos-relative'>
            <div id='logo-banner'>
              <img src='svgs/header-banner.svg'/>
            </div>
            <Slider
              images={this.props.viewdata.header || []}
              klass='slider-home'
              settings={{
                dots: false,
                arrows: false,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '100px'}}
            />
          </div>
          <Nav/>
        </header>
      );
    }

    return (
      <header>
        <h3>Caliparks</h3>
      </header>
    );
  }

  render() {
    return this.getHeaderContent();
  }

}

export default Header;
