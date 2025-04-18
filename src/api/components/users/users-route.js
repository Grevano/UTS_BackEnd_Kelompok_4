const express = require('express');
const { authenticateToken} = require('../../../utils/AuthenticateToken')
const { isAdmin } = require('../../../utils/AdminChecker')
const usersController = require('./users-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  //Get All admin users
  route.get('/admin', authenticateToken, isAdmin, usersController.getAdminUsers)

  // Create a new user
  route.post('/',  authenticateToken, isAdmin, usersController.createUser); 

  //Update user role
  route.put('/:id/role', authenticateToken, isAdmin, usersController.updateRole);

  // Delete user
  route.delete('/delete/:id', usersController.deleteUser);

  //Get list of users
  route.get('/', authenticateToken, isAdmin, usersController.getUsers);
};