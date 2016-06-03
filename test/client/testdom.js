var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype HTML><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;