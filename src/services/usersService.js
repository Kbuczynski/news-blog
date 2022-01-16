const TemplateService = require('./templateService');
const { generateId } = require('../helpers/generateId');

class NewsService extends TemplateService {
  constructor(users) {
    super();
    this._users = users;
  }

  getAllUsers() {
    return this.createResponse({ data: this._users });
  }

  login(user) {
    return this.createResponse({ data: this._users });
  }

  register(user) {
    return this.createResponse({ data: this._users });
  }
}

module.exports = NewsService;
