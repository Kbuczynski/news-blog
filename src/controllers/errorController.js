/* eslint-disable no-undef */

async function errorController(req, res) {
  const isAccessError = req.query?.isAccessError;

  res.render('pages/error/error', {
    layout: 'layoutDefault',
    pageTitle: 'Error',
    pageNotFound: !isAccessError,
  });
}

exports.errorController = errorController;
