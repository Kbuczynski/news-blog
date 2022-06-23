/* eslint-disable no-return-await */
const database = require('../database');
const { generateId } = require('../helpers/generateId');

class CommentsRepository {
  async getComments(id) {
    return (await database.query(`
      SELECT comments.*, users.login AS author FROM comments 
      JOIN users ON users.id = comments.author 
      WHERE comments.news = '${id}'
    `)).rows;
  }

  async getCommentsByAuthor(id, created = 'DESC') {
    return (await database.query(`
      SELECT comments.*, news.id as news_id FROM comments
      JOIN news ON news.id = comments.news
      JOIN users ON users.id = comments.author
      WHERE comments.author = '${id}'
      ORDER BY created_at ${created}
    `)).rows;
  }

  async addComment(comment) {
    return (await database.query(`
      INSERT INTO comments VALUES (
        '${generateId()}',
        '${comment.newsId}',
        '${comment.author}',
        '${comment.content}')
    `));
  }

  async removeComment(id) {
    return (await database.query(`
      DELETE FROM comments WHERE comments.id = '${id}'
    `));
  }
}

module.exports = CommentsRepository;
