//for authorization
const jwt = require('jsonwebtoken');

const secret = process.env.ACCESS_TOKEN_SECRET;

const generateAccessToken = (userPayload) => {
  return jwt.sign(userPayload, secret, { expiresIn: '1h' });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, secret);
};

// const decodeAccessToken = (token) => jwt.decode(token);

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  // decodeAccessToken,
};

