import React, {PropTypes, Component} from 'react';

class SubView extends Component {

  static propTypes = {
    theme: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.renderable
    ]).isRequired
  };

  static defaultProps = {
    theme: 'theme-white'
  }

  render() {
    const klass = 'sub-view row ' + this.props.theme;
    return (
      <section className={klass}>
        <span className='arrow' />
        {this.props.children}
      </section>
    );
  }

}

export default SubView;

