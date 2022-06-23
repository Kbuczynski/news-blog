/* eslint-disable no-return-await */
const database = require('../database');
const { generateId } = require('../helpers/generateId');

class NewsRepository {
  async getAllNews() {
    return (await database.query(`
      SELECT news.*, categories.name AS category_name FROM news
        JOIN categories ON news.category = categories.id
        ORDER BY news.created_at DESC
    `)).rows;
  }

  async getSingleNews(id) {
    return (await database.query(`
      SELECT users.login, news.* FROM news JOIN users ON news.author = users.id WHERE news.id = '${id}'
    `)).rows;
  }

  async addNews(news) {
    return (await database.query(`
      INSERT INTO news VALUES (
        '${generateId()}',
        '${news.title}',
        '${news.header}',
        '${news.content}',
        '${news.description}', 
        '${news.author}',
        '${news.category ? news.category : 1}')
    `));
  }

  async getNewsByAuthor(id, modified = 'DESC', category = '') {
    return (await database.query(`
      SELECT news.*, categories.name AS category_name FROM news
        JOIN categories ON news.category = categories.id
        WHERE news.author = '${id}'
        ${category && `AND news.category = ${category}`}
        ORDER BY news.modified_at ${modified}
    `)).rows;
  }

  async removeNews(id) {
    return (await database.query(`
      DELETE FROM news WHERE news.id = '${id}'
    `));
  }

  async editNews(news) {
    return (await database.query(`
      UPDATE news SET 
        title = '${news.title}',
        header = '${news.header}',
        content = '${news.content}',
        description = '${news.description}',
        category = ${news.category},
        modified_at = DEFAULT
        WHERE news.id = '${news.id}'
    `));
  }
}

module.exports = NewsRepository;
