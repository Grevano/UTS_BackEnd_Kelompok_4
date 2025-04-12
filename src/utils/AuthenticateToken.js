// Middleware for authenticating requests using JWT
const { verifyAccessToken } = require('./jwt');
const { errorResponder, errorTypes } = require('../core/errors');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return next(errorResponder(errorTypes.NO_TOKEN_INPUT, 'Access token required'))
  }

  try {
    const user = verifyAccessToken(token); 
    req.user = user; 
    next(); 
  } catch (err) {
    return next(errorResponder(errorTypes.INVALID_CREDENTIALS, 'Invalid or expired token'));
    }
}

module.exports = { authenticateToken };
