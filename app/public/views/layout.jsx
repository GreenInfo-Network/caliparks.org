import React, {PropTypes} from 'react';
import App from './app.jsx';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from '../../node_modules/react-intl/lib/locale-data/en';
import es from '../../node_modules/react-intl/lib/locale-data/es';

addLocaleData(en);
addLocaleData(es);

class Layout extends React.Component {
  static propTypes = {
    lang: PropTypes.string,
    messages: PropTypes.object,
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
            <title>{this.props.title}</title>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='description' content='' />
            <link href='https://fonts.googleapis.com/css?family=Lato:400,100,300,900,700' rel='stylesheet' type='text/css'/>
            <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.15/slick.css' />
            <link rel='stylesheet' href='/styles.css' type='text/css'/>
            <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon'/>
          </head>
          <body>
            <IntlProvider locale={this.props.lang} messages={this.props.messages}>
              <App {...this.props} />
            </IntlProvider>
            <script src='/bundle.js'></script>
          </body>
        </html>

    );
  }
}

export default Layout;
