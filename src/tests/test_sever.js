const http = require('http');
const app = require('../app');

// setup different sever for test
const server = http.createServer(app);
server.listen('2000');

module.exports = server;
