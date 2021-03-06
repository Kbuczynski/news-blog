/* eslint-disable no-undef */

async function homeController(req, res) {
  const newsList = await api.get('news');

  const loginCookie = req.headers.cookie?.split(';').find((c) => c.includes('login'));
  const user = loginCookie ? (await api.get('users')).data.filter((u) => u.id === loginCookie.split('=')[1]) : [];

  const searchResults = req.query.search;

  if (searchResults) {
    newsList.data = newsList.data.map((n) => {
      const newsTitle = n.title.toLowerCase();
      const newsDescription = n.description.toLowerCase();
      const newsCategory = n.category_name.toLowerCase();
      const searchTitle = searchResults.toLowerCase();

      if (newsTitle.includes(searchTitle)
        || newsDescription.includes(searchTitle)
        || newsCategory.includes(searchTitle)) return n;
      return false;
    }).filter(Boolean);
  }

  res.render('pages/home/home', {
    layout: 'layoutDefault',
    pageTitle: 'Home',
    newsList: {
      ...newsList,
      data: newsList.data,
    },
    search: searchResults || '',
    login: !!user.length,
    user: user[0] || [],
  });
}

exports.homeController = homeController;
