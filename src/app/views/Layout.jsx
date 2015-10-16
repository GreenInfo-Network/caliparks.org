import React, {
  PropTypes
} from 'react';

class Layout extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.renderable
    ]).isRequired
  };

  render() {
    return (

      <html lang='es'>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <title>{ this.props.title }</title>
          <meta name='description' content='' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link href='https://fonts.googleapis.com/css?family=Lato:400,100,300,900,700' rel='stylesheet' type='text/css'/>
          <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.15/slick.css'/>
          <link rel='stylesheet' href='/styles.css' type='text/css'/>
          <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon'/>
        </head>
        <body>
          <div className='container'>
            { this.props.children }
          </div>
          <script src='/app.js'></script>
          <script type='text/javascript' src='https://code.jquery.com/jquery-2.1.3.min.js'></script>
          <script type='text/javascript' src='//cdn.jsdelivr.net/jquery.slick/1.5.8/slick.min.js'></script>
        </body>
      </html>

    );
  }
}

export default Layout;
