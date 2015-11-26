import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import Waypoint from 'react-waypoint';

export default class PhotoGrid extends PureComponent {
  static propTypes = {
    photos: PropTypes.array,
    selected: PropTypes.number,
    onPhotoClick: PropTypes.func,
    loadImageHandler: PropTypes.func,
    fetching: PropTypes.bool
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

  loadMoreImages() {
    if (typeof this.props.loadImageHandler === 'function') {
      this.props.loadImageHandler();
    }
  }

  render() {
    const showWaypoint = this.props.fetching ? false : true;
    const width = this.props.photos.length * 160;
    return (
      <div className='photo-grid'>
        <ul className='inner' style={{width: width}}>
        {this.props.photos.map((photo, idx) => {
          return (
            <li key={idx} className={this.getPhotoClass(idx)} onClick={this.onClickHandler.bind(this, idx)}>
              <img src={photo.standard_resolution} />
            </li>
          );
        })}
        </ul>
        {showWaypoint &&
          <Waypoint
            onEnter={this.loadMoreImages.bind(this)}
            threshold={0} />
        }
      </div>
    );
  }
}
