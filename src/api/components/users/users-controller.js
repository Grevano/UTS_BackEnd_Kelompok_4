const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword } = require('../../../utils/password');
const { isValidObjectId } = require('mongoose');

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
    
    //if request body is empty
    if (!email && !fullName && !password && !confirmPassword && !role) {
      throw errorResponder(errorTypes.EMPTY_BODY, 'Request Body empty, please fill with Email, Full Name, Password, ConfirmPassword, and Role (or LastSession)');
    }
    
    // role can only be either admin, teacher, or student
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
    if (!password) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 
        'Password is required'
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
        errorTypes.VALIDATION,
        'Password must be at least 8 characters long'
      );
    }

    // The password and confirm password must match
    if (password !== confirmPassword) {
      throw errorResponder(
        errorTypes.VALIDATION,
        'Password and confirm password do not match'
      );
    }
//role can onlly be either admin, teacher, or student
    if (!allowedRoles.includes(role)){
      throw errorResponder(
        errorTypes.VALIDATION,
        'Invalid role'
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
    const userId = request.params.id;
    if (!isValidObjectId(userId)) {
      throw errorResponder(
        errorTypes.BAD_REQUEST,
        'Invalid userID was provided'
      );
    }
  
    const success = await usersService.deleteUser(userId);
    if (!success) {
      throw errorResponder(
        errorTypes.NOT_FOUND,
        'No user was found with the provided user ID'
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

async function updateRolesByDateRange(request, response, next) {
  try {
    const { startDate, endDate, role } = request.body;
    
    if (!startDate || !endDate || !role) {
      throw errorResponder(errorTypes.BAD_REQUEST, 'A required field was not provided');
    }

    if (!allowedRoles.includes(role)) {
      throw errorResponder(errorTypes.BAD_REQUEST, 'Invalid or empty role');
    }
    
    const updatedCount = await usersService.updateRolesByDateRange(startDate, endDate, role);
    if (updatedCount === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'No accounts in the provided date range');
    }
    return response.status(200).json({ message: `${updatedCount} account(s) updated to ${role} role successfully.` });
  } catch (error) {
    return next(error);
  }
}

//for testing purposes
async function getUser(request, response, next) {
  try {
    const user = await usersService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}


module.exports = {
  getUsers,
  getAdminUsers,
  createUser,
  deleteUser,
  updateRolesByDateRange,
  getUser,
};
