// Load environment variables if on development machine
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
}

var jsdom = require('jsdom');
const DEFAULT_HTML = '<!doctype html><html><body></body></html>';
global.document = jsdom.jsdom(DEFAULT_HTML);
global.window = document.parentWindow;