/* eslint-disable no-undef */

async function articleController(req, res) {
  const news = await api.get(`news/${req.params.id}`);
  const loginCookie = req.headers.cookie.split(';').find((c) => c.includes('login'));
  const user = loginCookie ? (await api.get('users')).data.filter((u) => u.id === loginCookie.split('=')[1]) : [];
  const comments = await api.get(`comments/${req.params.id}`);
  const commentsData = comments.data.map((c) => (c.author === user[0]?.login ? { ...c, isYourComment: true } : c));

  res.render('pages/article/article', {
    layout: 'layoutDefault',
    pageTitle: news.data[0]?.title,
    news: {
      data: news.data[0],
      message: news.message,
      errors: news.errors.join(' '),
    },
    comments: {
      ...comments,
      data: commentsData,
    },
    login: !!user.length,
    user: user[0] || [],
    isArticleDetails: true,
  });
}

exports.articleController = articleController;
