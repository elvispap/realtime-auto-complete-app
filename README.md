# Description

A real time input auto-completion application written in AngularJS.

##### Currently supported APIs:
- Search for books using the Google Books API
- Search for locations using the Google Maps API


# Running the application

 - cd dist; http-server -p ${port}      // default port is 8080
 - Login credentials: username: 'test' and password: 'test'


# Development
##### install dependencies

 - npm install
 - bower install

##### run the application

- grunt; grunt watch
- cd /dist
- http-server -p ${port} // default port is 8080


- To have the page auto refresh task from grunt please install the [LiveReload extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?utm_source=chrome-app-launcher-info-dialog)
- For Cross origin issues when using the exteneral APIs please start Chrome in unsecure mode (Linux: google-chrome --disable-web-security)
 or install the Chrome [Allow-Control-Allow-Origin extension](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)  

### IMPORTANT: Please note that the API tokens for the Google APIs will be not available in the next days.
Please replace them using your owns. (see: src/application.js > $googleApiConfig.api.keys)
