const userRepository = require('../users/users-repository');
const { passwordMatched } = require('../../../utils/password');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { generateAccessToken } = require('../../../utils/jwt');


async function login(email, password) {
  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    throw errorResponder(
      errorTypes.INVALID_CREDENTIALS,
      'Did not find a user with the specified email'
    );
  }

  const passbenar = await passwordMatched(password, user.password);

  if (!passbenar) {
    throw errorResponder(errorTypes.INVALID_PASSWORD, 'Incorrect Password');
  }

  const payload = {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role
  };

  const token = generateAccessToken(payload);

  return {
    message: `${user.fullName} successfully logged in, accessToken: ${token}`,
    token,
    user: payload, 
  };
}

module.exports = {
  login,
};
