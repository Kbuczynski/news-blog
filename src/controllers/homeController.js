/* eslint-disable no-undef */

async function homeController(req, res) {
  const newsList = await api.get('news');
  const searchResults = req.query.search;

  if (searchResults) {
    newsList.data = newsList.data.map((n) => {
      const newsTitle = n.title.toLowerCase();
      const searchTitle = searchResults.toLowerCase();

      if (newsTitle.includes(searchTitle)) return n;
      return false;
    }).filter(Boolean);
  }

  res.render('pages/home/home', {
    layout: 'layoutDefault',
    pageTitle: 'Home',
    newsList,
    search: searchResults || '',
  });
}

exports.homeController = homeController;
