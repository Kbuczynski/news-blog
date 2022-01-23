/* eslint-disable no-alert, no-undef */

// TODO: create login class

const loginButton = document.querySelector('.header__login');

loginButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const login = prompt('Enter login');
  const password = prompt('Enter password');

  const response = await api.post('users/login', { login, password });
  // eslint-disable-next-line no-console
  if (!response.errors.length) document.cookie = `login=${response.data[0].id};path=/`;
  else document.cookie = 'login=false;path=/';

  // eslint-disable-next-line no-restricted-globals
  location.reload();
});
