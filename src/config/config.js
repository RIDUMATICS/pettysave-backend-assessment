require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    logging: false, // disable logging; default: console.log
    dialect: 'postgres',
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    dialect: 'postgres',
    logging: false, // disable logging; default: console.log
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
