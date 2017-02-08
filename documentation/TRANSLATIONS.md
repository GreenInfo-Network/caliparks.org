# Translations

Caliparks.org is using [react-intl](https://github.com/yahoo/react-intl) to manage the translations and [babel-plugin-react-intl](https://github.com/yahoo/babel-plugin-react-intl/tree/master) webpack plugin to extract the translation strings.

### Extracting Default Messages

In the `app` directory, run `npm run translate`:

Once this is done, replace the `en.json` and `es.json` files located in the [locales](./locales) directory with the file in [translations/lang/](./translations/lang/).


### Translating messages

Only change the values (right hand side) in the `es.json` file inside the [locales](./locales) directory.
