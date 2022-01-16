/* eslint-disable no-undef */

async function homeController(_, res) {
  const newsList = await api.get('news');

  res.render('pages/home/home', {
    layout: 'layoutDefault',
    pageTitle: 'Home',
    newsList,
  });
}

exports.homeController = homeController;
