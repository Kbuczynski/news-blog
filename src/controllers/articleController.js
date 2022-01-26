/* eslint-disable no-undef */

async function articleController(req, res) {
  const news = await api.get(`news/${req.params.id}`);
  const user = req.headers.cookie
    ? (await api.get('users')).data.filter((u) => u.id === req.headers.cookie.split('=')[1]) : [];
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
  });
}

exports.articleController = articleController;
