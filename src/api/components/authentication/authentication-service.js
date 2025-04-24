const userRepository = require('../users/users-repository');
const { passwordMatched } = require('../../../utils/password');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { generateAccessToken } = require('../../../utils/jwt');


async function login(email, password) {
  const user = await userRepository.getUserByEmail(email);
  //no user found
  if (!user) {
    throw errorResponder(
      errorTypes.INVALID_CREDENTIALS,
      'Did not find a user with the specified email'
    );
  }
  //checks if the password matches the one in the database
  const passbenar = await passwordMatched(password, user.password);

  if (!passbenar) {
    throw errorResponder(errorTypes.INVALID_PASSWORD, 'Incorrect Password');
  }

  //payload for token
  const payload = {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role
  };

  //create token and updates user session
  const token = generateAccessToken(payload);
  await userRepository.updateUserSession(payload.id)

  return {
    message: `${user.fullName} successfully logged in, please enter the token into Auth -> bearer`,
    token: token,
    user: payload, 
  };
}
module.exports = {
  login,
};
