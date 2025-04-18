const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword } = require('../../../utils/password');

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

    if (!allowedRoles.includes(role)){
      //Role can only be admin, teacher, or student
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



//function to update the role of the user and make sure that the role is not empty or invalid
// and the user exists, but make sure that only the admin can update the role of the user
// and the user cannot update his own role
async function updateRole(request, response, next) {
  try {
    const { role } = request.body;
    const userId = request.params.id;

    // Check if the user exists
    const user = await usersService.getUser(userId);
    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    // Check if the role is valid
    if (!allowedRoles.includes(role)) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Invalid or Empty role');
    }

    // Update the user's role
    const success = await usersService.updateRole(userId, role);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user role'
      );
    }

    return response.status(200).json({ message: 'User role updated successfully' });
  } catch (error) {
    return next(error);
  }
}



async function updateUser(request, response, next) {
  try {
    const { email, full_name: fullName } = request.body;

    // User must exist
    const user = await usersService.getUser(request.params.id);
    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

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

    // Email must be unique, if it is changed
    if (email !== user.email && (await usersService.emailExists(email))) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email already exists'
      );
    }

    const success = await usersService.updateUser(
      request.params.id,
      email,
      fullName
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function changePassword(request, response, next) {
  // TODO: Implement this function
  // const id = request.params.id;
  // const {
  //   old_password: oldPassword,
  //   new_password: newPassword,
  //   confirm_new_password: confirmNewPassword,
  // } = request.body;
  //
  // Make sure that:
  // - the user exists by checking the user ID
  // - the old password is correct
  // - the new password is at least 8 characters long
  // - the new password is different from the old password
  // - the new password and confirm new password match
  //
  // Note that the password is hashed in the database, so you need to
  // compare the hashed password with the old password. Use the passwordMatched
  // function from src/utils/password.js to compare the old password with the
  // hashed password.
  //
  // If any of the conditions above is not met, return an error response
  // with the appropriate status code and message.
  //
  // If all conditions are met, update the user's password and return
  // a success response.
  return next(errorResponder(errorTypes.NOT_IMPLEMENTED));
}

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

module.exports = {
  getUsers,
  getAdminUsers,
  getUser,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
  updateRole,
};