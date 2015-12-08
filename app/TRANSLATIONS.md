# Translations
Caliparks.org is using [react-intl](https://github.com/yahoo/react-intl) to manage the translations.

### Extracting Default Messages
In the `app` directory, run:
```
webpack --config ./webpack.config.translations.babel.js
./node_modules/.bin/babel-node translate.js
```

Once these two steps are done, copy and/or merge the `en.json` and `es.json` files located in [translations/lang/](./translations/lang/) into the [locales](./locales) directory.

### Updating translations
Only change the values in the `es.json` file inside the [locales](./locales) directory.