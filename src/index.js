'use strict';

const Hapi = require('@hapi/hapi');
const AuthBearer = require('hapi-auth-bearer-token');
const Auth = require('./auth');


require('dotenv').config({
  path: '../.env'
});
const routes = require('./routes');
const init = async () => {
  const server = Hapi.server({
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST
  });

  server.route(routes);

  await server.register(AuthBearer);

  server.auth.strategy('user', 'bearer-access-token', Auth, {
    allowQueryToken: true
  });
  server.auth.default('user');

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();