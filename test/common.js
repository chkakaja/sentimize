if (process.env.NODE_ENV !== 'integration') {
  require('dotenv').config({ path: './env/.env' });
}