const TemplateService = require('../helpers/templateService');
const UsersRepository = require('../repositories/usersRepository');

class NewsService extends TemplateService {
  constructor() {
    super();
    this._repository = new UsersRepository();
  }

  async getAllUsers() {
    let message = '';
    const data = await this._repository.getAllUsers();
    if (!data.length) message = 'There are no users.';
    return this.createResponse({ data, message });
  }

  async register(user) {
    let message = '';
    const errors = this._validate(user);
    let data = [];

    if (!errors.length) {
      try {
        data = await this._repository.addUser(user);
        message = 'User was added correctly.';
      } catch (e) {
        errors.push(e.message);
      }
    }

    return this.createResponse({ data, message, errors });
  }

  async login(user) {
    let message = '';
    const errors = [];
    let data = [];

    try {
      data = await this._repository.getUser(user);
      message = 'Login successful.';
    } catch (e) {
      errors.push(e.message);
    }

    return this.createResponse({ data, message });
  }

  _validate(user) {
    const { login, password } = user;
    const errors = [];

    if (typeof login !== 'string') {
      errors.push('No news login.');
    } else if (login.length === 0) errors.push('Login length can not be empty.');
    else if (login.length > 10) errors.push('Login length can not be longer than 10.');

    if (typeof password !== 'string') {
      errors.push('No news password.');
    } else if (password.length < 6) errors.push('Password length can not be less than 6.');

    return errors;
  }
}

module.exports = NewsService;
