/* eslint-disable no-undef, no-alert, no-console */

// TODO: handle login / logout without reload

class Users {
  async login(e) {
    e.preventDefault();
    const login = prompt('Enter login');
    const password = prompt('Enter password');

    const response = await api.post('users/login', { login, password });

    if (!response.errors.length) document.cookie = `login=${response.data[0].id};path=/`;
    else document.cookie = 'login=false;path=/';

    window.location.reload();
  }

  async register(e) {
    e.preventDefault();
    const login = prompt('Enter new login');
    const password = prompt('Enter new password');

    const response = await api.post('users/register', { login, password });
    console.log(response);
  }

  logout(e) {
    e.preventDefault();
    document.cookie = 'login=false;path=/';
    window.location.reload();
  }
}

export default Users;
