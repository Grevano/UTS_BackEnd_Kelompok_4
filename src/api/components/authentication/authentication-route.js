const express = require('express');

const authcontroller = require('./authentication-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/authentication', route);

  // login
  route.post('/login', authcontroller.login);
};
