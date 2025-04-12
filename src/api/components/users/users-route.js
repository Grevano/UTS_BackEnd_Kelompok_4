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
  route.get('/admin', authenticateToken, isAdmin, usersController.getUsers)

  // Create a new user
  route.post('/', authenticateToken, isAdmin, usersController.createUser);

  // Get user detail
  // route.get('/:id', usersController.getUser);

  // Update user
  // route.put('/:id', usersController.updateUser);

  // Change password
  // route.put('/:id/change-password', usersController.changePassword);

  // Delete user
  // route.delete('/:id', usersController.deleteUser);
};
