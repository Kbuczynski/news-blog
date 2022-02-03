/* eslint-disable no-undef */

// eslint-disable-next-line consistent-return
async function profileController(req, res) {
  const loginCookie = req.headers.cookie?.split(';').find((c) => c.includes('login'));
  const user = loginCookie ? (await api.get('users')).data.filter((u) => u.id === loginCookie.split('=')[1]) : [];

  const newsList = await api.get('news');
  const newsData = newsList.data
    .filter((news) => news.author.toLowerCase() === user[0]?.login.toLowerCase())
    .map((news) => ({ ...news, edit: true }));

  if (!user.length) return res.redirect('/error?isAccessError=true');

  res.render('pages/profile/profile', {
    layout: 'layoutDefault',
    pageTitle: 'Profile',
    newsList: {
      data: newsData.reverse(),
      message: !newsData.length && 'There are no news. Let\'s create new one!',
    },
    stats: {
      countNews: newsData.length,
    },
    login: !!user.length,
    user: user[0] || [],
    isProfile: true,
  });
}

exports.profileController = profileController;
