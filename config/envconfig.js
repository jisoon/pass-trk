const dotenv = require('dotenv');
const path = require('path');

if (process.env.NODE_ENV === 'prod') {
  dotenv.config({path: path.join(__dirname, '.env.prod')})
} else {
  dotenv.config({path: path.join(__dirname, '.env.dev')})
}
