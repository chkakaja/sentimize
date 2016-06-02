if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
}