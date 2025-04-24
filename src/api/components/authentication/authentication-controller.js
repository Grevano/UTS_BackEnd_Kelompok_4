const authservice = require('./authentication-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function login(request, response, next) {
  try {
    //checks for incomplete body
    const { email, password} = request.body;
    if (!email || !password) {
      throw errorResponder(
        errorTypes.VALIDATION,
        'Please provide an email and a password'
      );
    }
    //login using email and password
    const user = await authservice.login(email, password);

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
