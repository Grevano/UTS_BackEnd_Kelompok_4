const express = require('express');

// const nama-kp = require('./components/nama-komponen/nama-komponen-route');
//untuk setiap endpoint dibuat begitu juga
const authentication = require('./components/authentication/authentication-route')
const users = require('./components/users/users-route')
module.exports = () => {
  const app = express.Router();

  //nama-kp(app);
  //untuk setiap endpoint dibuat begitu juga
  authentication(app);
  users(app);

  return app;
};
