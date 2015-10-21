import React, {PropTypes} from 'react';
import Header from '../components/header.jsx';

class Layout extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    viewdata: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]).isRequired,
    children: PropTypes.oneOfType([
      PropTypes.renderable
    ]).isRequired

  };

  render() {
    return (
      <html lang='es'>
        <head>
          <meta charSet='utf-8' />
          <title>{this.props.title}</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='description' content='' />
          <link href='https://fonts.googleapis.com/css?family=Lato:400,100,300,900,700' rel='stylesheet' type='text/css'/>
          <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.15/slick.css' />
          <link rel='stylesheet' href='/styles.css' type='text/css'/>
          <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon'/>
        </head>
        <body>
          <div className='container'>
            <Header {...this.props}/>
            <main role='application'>
              { this.props.children }
            </main>
          </div>
          <script src='/bundle.js'></script>
        </body>
      </html>
    );
  }
}

export default Layout;
