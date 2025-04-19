const usersRepository = require('./users-repository');

async function getAdminUsers(offset, limit) {
  return usersRepository.getAdminUsers(offset, limit);
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function createUser(email, password, fullName, role, lastSession) {
  return usersRepository.createUser(email, password, fullName, role, lastSession);
}

async function updateRole(id, role) {
  return usersRepository.updateRole(id, role);
}

//for testing purposes
async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}

async function getUser(id) {
  return usersRepository.getUser(id);
}

async function getUsers(offset, limit) {
  return usersRepository.getUsers(offset, limit);
}

module.exports = {
  getUsers,
  getAdminUsers,
  getUser,
  emailExists,
  createUser,
  deleteUser,
  updateRole,
};