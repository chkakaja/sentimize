// Load environment variables if on development machine
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
}

var jsdom = require('jsdom');
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;