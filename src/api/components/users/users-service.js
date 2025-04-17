const usersRepository = require('./users-repository');

async function getUsers(offset, limit) {
  return usersRepository.getUsers(offset, limit);
}

async function getAdminUsers(offset, limit) {
  return usersRepository.getAdminUsers(offset, limit);
}

async function getUser(id) {
  return usersRepository.getUser(id);
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function createUser(email, password, fullName, role) {
  return usersRepository.createUser(email, password, fullName, role);
}

async function updateUser(id, email, fullName) {
  return usersRepository.updateUser(id, email, fullName);
}

async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}

async function deleteAllStudentUsers() {
  const deletedCount = await usersRepository.deleteAllStudents();
  return { deletedCount };
}

module.exports = {
  getUsers,
  getAdminUsers,
  getUser,
  emailExists,
  createUser,
  updateUser,
  deleteUser,
  deleteAllStudentUsers,
};
