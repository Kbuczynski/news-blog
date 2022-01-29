import Users from './users.js';

class Menu {
  constructor(base) {
    this._base = base;
    this._users = new Users();

    this._loginButton = this._base.querySelector('.menu__login');
    this._loginHandler = this._login.bind(this);

    this._registerButton = this._base.querySelector('.menu__register');
    this._registerHandler = this._register.bind(this);

    this._logoutButton = this._base.querySelector('.menu__logout');
    this._logoutHandler = this._logout.bind(this);

    this._profileButton = this._base.querySelector('.menu__profile');
    this._profileHandler = this._profile.bind(this);

    this._addEvents();
  }

  _addEvents() {
    this._loginButton && this._loginButton.addEventListener('click', this._loginHandler);
    this._registerButton && this._registerButton.addEventListener('click', this._registerHandler);
    this._logoutButton && this._logoutButton.addEventListener('click', this._logoutHandler);
    this._profileButton && this._profileButton.addEventListener('click', this._profileHandler);
  }

  async _login(e) {
    this._users.login(e);
  }

  async _register(e) {
    this._users.register(e);
  }

  _logout(e) {
    this._users.logout(e);
  }

  _profile(e) {
    e.preventDefault();
    window.location.href = `${window.location.origin}/profile`;
  }
}

export default Menu;
