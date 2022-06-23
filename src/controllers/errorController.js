/* eslint-disable no-undef */

async function errorController(req, res) {
  const loginCookie = req.headers.cookie?.split(';').find((c) => c.includes('login'));
  const user = loginCookie ? (await api.get('users')).data.filter((u) => u.id === loginCookie.split('=')[1]) : [];

  const isAccessError = req.query?.isAccessError;

  res.render('pages/error/error', {
    layout: 'layoutDefault',
    pageTitle: 'Error',
    pageNotFound: !isAccessError,
    login: !!user.length,
    back: '/',
  });
}

exports.errorController = errorController;
