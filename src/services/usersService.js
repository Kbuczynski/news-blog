const TemplateService = require('./templateService');
const { generateId } = require('../helpers/generateId');

class NewsService extends TemplateService {
  constructor(users) {
    super();
    this._users = users;
  }

  getAllUsers() {
    let message = '';
    const data = this._users;
    if (!data.length) message = 'There are no users.';
    return this.createResponse({ data, message });
  }

  register(user) {
    let message = '';
    const errors = this._validate(user);
    errors.push(...this._isExist(user));

    const data = {
      id: generateId(),
      ...user,
    };

    if (!errors.length) {
      this._users.push(data);
      message = 'User was added correclty.';
    }

    return this.createResponse({ data, message, errors });
  }

  login(user) {
    let message = '';
    const errors = this._isCorrectLogin(user);
    const data = [];

    if (!errors.length) {
      data.push(this._getUserByLogin(user)[0]);
      message = 'Login successfull.';
    }

    return this.createResponse({ data, message, errors });
  }

  _getUserByLogin(user) {
    return this._users.filter((u) => u.login.toLowerCase() === user.login.toLowerCase());
  }

  _isCorrectLogin(user) {
    const errors = [];
    const pendingUser = this._getUserByLogin(user);

    if (!pendingUser.length) errors.push('User with given login does not exist.');
    else user.password !== pendingUser[0].password && errors.push('Wrong password.');

    return errors;
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

  _isExist(user) {
    const errors = [];
    const loginUsed = this._getUserByLogin(user).length;

    loginUsed && errors.push('User with given login already exist.');

    return errors;
  }
}

module.exports = NewsService;
