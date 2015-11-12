import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';

export default class PhotoGrid extends PureComponent {
  static propTypes = {
    photos: PropTypes.array,
    selected: PropTypes.number,
    onPhotoClick: PropTypes.func
  };

  static defaultProps = {
    photos: [],
    selected: 0
  };

  componentDidMount() {}

  componentDidUpdate() {}

  onClickHandler(idx) {
    if (typeof this.props.onPhotoClick === 'function') {
      this.props.onPhotoClick(idx);
    }
  }

  getPhotoClass(idx) {
    if (idx === this.props.selected) return 'photo selected';
    return 'photo';
  }

  render() {
    return (
      <div className='photo-grid'>
        <ul className='inner'>
        {this.props.photos.map((photo, idx) => {
          return (
            <li key={idx} className={this.getPhotoClass(idx)} onClick={this.onClickHandler.bind(this, idx)}>
              <img src={photo.standard_resolution} />
            </li>
          );
        })}
        </ul>
      </div>
    );
  }
}
