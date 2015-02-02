Requirements:
- You need node, this was written in v0.10.28, but other versions may also work
- You need Google Chrome

To set up:
- clone this repo
- `sudo npm install -g bower grunt-cli`
- cd into project
- `npm install`
- `bower install`
- `npm run update-webdriver`

To launch the server and open a browser window navigating to the app
- `grunt serve`

To run all unit tests:
- `grunt test`

To run integration/end-to-end tests:
- `grunt test:e2e`