const TemplateService = require('../helpers/templateService');
const CommentsRepository = require('../repositories/commentsRepository');

class CommentsService extends TemplateService {
  constructor() {
    super();
    this._repository = new CommentsRepository();
    this._commentsProperties = ['id', 'newsId', 'author', 'content', 'created_at'];
  }

  async getComments(newsId) {
    let message = '';
    const errors = [];
    let data = [];

    try {
      data = await this._repository.getComments(newsId);
    } catch (e) {
      errors.push(e.message);
    }

    if (!data.length) {
      data = [];
      message = 'There are no comments.';
    }

    return this.createResponse({ data, message, errors });
  }

  async addComment(comment) {
    let message = '';
    const errors = this._validate(comment);
    let data = [];

    !this.isProperData(this._commentsProperties, comment) && errors.push('Additional property was added.');

    if (!errors.length) {
      try {
        data = await this._repository.addComment(comment);
        message = 'Comment was added correctly.';
      } catch (e) {
        errors.push(e.message);
      }
    }

    return this.createResponse({ data, message, errors });
  }

  async removeComment(id) {
    let message = '';
    const errors = [];
    let data = [];

    try {
      data = await this._repository.removeComment(id);
      message = 'Comment was removed correctly';
    } catch (e) {
      errors.push(e.message);
    }

    return this.createResponse({ data, message, errors });
  }

  _validate(comment) {
    const { content, author } = comment;
    const errors = [];

    if (typeof content !== 'string') {
      errors.push('No comment content.');
    } else if (content.length === 0) errors.push('Content length can not be empty.');
    else if (content.length > 30) errors.push('Content length can not be longer than 30.');

    if (typeof author !== 'string') {
      errors.push('No comment author.');
    } else if (author.length === 0) errors.push('Author length can not be empty.');
    else if (author.length > 50) errors.push('Author length can not be longer than 50.');

    return errors;
  }
}

module.exports = CommentsService;
