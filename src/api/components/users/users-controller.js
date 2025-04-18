const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword } = require('../../../utils/password');

async function getAdminUsers(request, response, next) {
  try {
    const offset = request.query.offset || 0;
    const limit = request.query.limit || 20;
    const users = await usersService.getAdminUsers(offset, limit);

    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

const allowedRoles = ['admin', 'teacher', 'student']
async function createUser(request, response, next) {
  try {
    const {
      email,
      password,
      full_name: fullName,
      confirm_password: confirmPassword,
      role: role,
    } = request.body;

    let lastSession = (request.body.lastSession && !isNaN(new Date(request.body.lastSession)))
      ? new Date(request.body.lastSession)
      : new Date();
    

    // Email is required and cannot be empty
    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
    }

    // Full name is required and cannot be empty
    if (!fullName) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Full name is required'
      );
    }
    
    // Role can only be either admin, teacher, or student
    if (!allowedRoles.includes(role) || !role){
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Invalid or Empty role'
      );
    }

    // Email must be unique
    if (await usersService.emailExists(email)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email already exists'
      );
    }

    // The password is at least 8 characters long
    if (!password) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password is required'
      );
    }

    // The password is at least 8 characters long
    if (password.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password must be at least 8 characters long'
      );
    }

    // The password and confirm password must match
    if (password !== confirmPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password and confirm password do not match'
      );
    }

    // Hash the password before saving it to the database
    const hashedPassword = await hashPassword(password);

    // Create the user
    const success = await usersService.createUser(
      email,
      hashedPassword,
      fullName,
      role,
      lastSession
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create user'
      );
    }

    return response.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return next(error);
  }
}

//for testing purposes
async function deleteUser(request, response, next) {
  try {
    const success = await usersService.deleteUser(request.params.id);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

//for testing purposes
async function getUsers(request, response, next) {
  try {
    const offset = request.query.offset || 0;
    const limit = request.query.limit || 20;
    const users = await usersService.getUsers(offset, limit);

    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}


module.exports = {
  getUsers,
  getAdminUsers,
  createUser,
  deleteUser,
};
