import React from 'react';

class Footer extends React.Component {

  componentDidMount() { }

  render() {
    return (
      <footer id='footer' className='row footer theme-white'>
        <div className='col-six'>
          <h3>Stamen</h3>
        </div>
        <div className='col-six'></div>
        <div className='col-four footer-actions'>
          <div className='actions'>
            <div><button className='btn uppercase'>en espaÑol</button></div>
            <div><button className='btn uppercase'>feedback</button></div>
          </div>
        </div>
      </footer>
    );
  }

}

export default Footer;
