// Middleware untuk cek jika user adalah admin
const { errorResponder, errorTypes } = require('../core/errors');

function isAdmin(req, res, next) {
    //asumsikan jika info user sudah di masukkan ke req.user dari authentication, jadi harus
    //gunakan AuthenticateToken terlebih dahulu
    const user = req.user;
  
    if (user.role !== 'admin') {
      return next(errorResponder(errorTypes.NO_ANONYMOUS_ACCESS, 'Access denied. Admins only'))
    }
  
    next(); // User is admin, so continue to the next middleware/route handler
  }
  
  module.exports = isAdmin;
  