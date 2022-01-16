const TemplateService = require('./templateService');
const { generateId } = require('../helpers/generateId');

class CommentsService extends TemplateService {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getComments(newsId, isNewsExist) {
    let message = '';
    const errors = isNewsExist(newsId);
    const data = this._comments.filter((c) => c.newsId === newsId);
    if (!data.length) message = 'There are no comments.';

    return this.createResponse({ data, message, errors });
  }

  addComment(comment, isNewsExist) {
    let message = '';
    const errors = isNewsExist(comment.newsId);
    !errors.length
      && this._validate(comment).length
      && errors.push(this._validate(comment));

    const data = {
      id: generateId(),
      ...comment,
    };

    if (!errors.length) {
      this._comments.push(data);
      message = 'Comment was added correctly.';
    }

    return this.createResponse({ data, message, errors });
  }

  removeComment(id) {
    let message = '';
    const errors = this._isExist(id);
    let data = [];

    if (!errors.length) {
      data = this._comments.filter((c) => c.id !== id);
      this._comments = this._comments.filter((c) => c !== data[0]);
      message = 'Comment was removed correctly';
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

  _isExist(id) {
    const errors = [];

    if (!id) errors.push('Id does not exist.');
    if (!this._comments.some((n) => n.id === id)) errors.push('Comment with given id does not exist.');

    return errors;
  }
}

module.exports = CommentsService;
