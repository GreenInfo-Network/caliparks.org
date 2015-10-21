import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router';

class SliderBase extends React.Component {

  static propTypes = {
    klass: PropTypes.string,
    propKey: PropTypes.string,
    overlay: PropTypes.bool,
    images: PropTypes.array,
    clickHandler: PropTypes.func,
    settings: PropTypes.object.isRequired
  };

  static defaultProps = {
    klass: '',
    propKey: null,
    overlay: false,
    images: [],
    clickHandler: ()=>{},
    settings: {}
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() { }

  onClick(evt) {
    if (typeof this.props.clickHandler === 'function') this.props.clickHandler(evt.target);
  }

  imgError(evt) {
    console.log('EVT: ', evt.target);
  }

  makeSlides() {
    const that = this;
    const propKey = this.props.propKey || null;
    const overlay = this.props.overlay || false;

    if (!this.props.images) return [];
    if (!this.props.images.length) return [];

    return this.props.images.map((row, idx) => {
      const url = (propKey) ? row[propKey] : row;

      if (!overlay) return (<div key={idx}><img src={url} onError={that.imgError} onClick={that.onClick}/></div>);

      return (
        <div key={idx}>
          <Link to={`/park/${row.su_id}`}>
            <div className='overlay'><p className='place'>{row.su_name}</p></div>
            <img src={url} onError={that.imgError}/>
          </Link>
        </div>
      );
    });
  }

  render() {
    const extraKlass = (this.props.klass) ? ' ' + this.props.klass : '';
    const klass = 'slider-component' + extraKlass;

    return (
      <div ref='slider' className={klass}>
        <Slider {...this.props.settings}>
          {this.makeSlides()}
        </Slider>
      </div>
    );
  }

}

export default SliderBase;
