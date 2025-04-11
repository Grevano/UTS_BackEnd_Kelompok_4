//menggunakan bcrypt untuk menghash password dan keperluan authentication lainnya
//untuk sekarang code ini mengikuti template 
const bcrypt = require('bcrypt');

/**
 * Hash a plain text password
 * @param {string} password - The password to be hashed
 * @returns {string}
 */
async function hashPassword(password) {
  const saltRounds = 16; //jumlah kali password akan dihash

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });

  return hashedPassword;
}

/**
 * Compares a plain text password and its hashed to determine its equality
 * Mainly use for comparing login credentials
 * @param {string} password - A plain text password
 * @param {string} hashedPassword - A hashed password
 * @returns {boolean}
 */
async function passwordMatched(password, hashedPassword) {
  //menggunakan bcrypt untuk membandingkan kedua password, sebaiknya dipanggil saat user ditemukan saat proses authentication  
  return bcrypt.compareSync(password, hashedPassword); 
}

module.exports = {
  hashPassword,
  passwordMatched,
};
