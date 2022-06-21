/* eslint-disable no-return-await */
const database = require('../database');

class CategoriesRepository {
  async getAll() {
    return (await database.query(`
      SELECT * FROM categories
    `)).rows;
  }
}

module.exports = CategoriesRepository;
