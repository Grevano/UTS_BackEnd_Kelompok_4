const express = require('express');
const { authenticateToken} = require('../../../utils/AuthenticateToken')
const { isAdmin } = require('../../../utils/AdminChecker')
const usersController = require('./users-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // Get list of users
  route.get('/', authenticateToken, isAdmin, usersController.getUsers);

  //Get All admin users
  route.get('/admin', authenticateToken, usersController.getAdminUsers)

  // Create a new user
  route.post('/',  authenticateToken, isAdmin, usersController.createUser); 

  // Delete user, for testing purposes
  route.delete('/delete/:id', usersController.deleteUser);
};
