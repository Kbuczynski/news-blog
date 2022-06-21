const database = require('../database');

class UsersRepository {
  async getAllUsers() {
    return (await database.query('SELECT * FROM users')).rows;
  }

  async getUser(user) {
    return (await database.query(`
      SELECT * FROM users WHERE users.login = '${user.login}' AND users.password = '${user.password}'
      `)).rows;
  }

  async addUser(user) {
    return (await database.query(`
      INSERT INTO users VALUES (DEFAULT, '${user.login}', '${user.password}')
      `)).rows;
  }
}

module.exports = UsersRepository;
