var env = require('./env-config');

module.exports = {
  GOOGLE_CLIENT_ID: '',
  GOOGLE_CLIENT_SECRET: '',
  APPLICATION_URL: env.PROTOCOL + env.HOST + ':' + env.PORT
}