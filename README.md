# rick_morty

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
Run `npm run serve` for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.
```

# Description

Browse data about the characters from Rick and Morty series that are fetched from the GraphQL website. Choose if you want to search the information by providing the name, id or the episode. It is also possible to order the information or results by name, id or episode. The data are presented in the form of table which contains a photograph of each character and the information about the id, name, gender, species and the last episode. Choose the button at the bottom of the page to change the number of the page and read all the data. The application allows to create a list of favourite characters that will be stored locally on the client side. The button favourite redirects to the page where all the favourite characters are displayed.

See the app on Netlify:

Note: Some of the fetched data duplicate the information about the same character, so the application filter the results in order to return only the unique data. Thus, some id number might be missing.

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
