/* eslint-disable no-undef */

const CategoriesRepository = require('../repositories/categoriesRepository');

const categoriesRepository = new CategoriesRepository();

async function articleController(req, res) {
  const news = await api.get(`news/${req.params.id}`);

  const categories = await categoriesRepository.getAll();

  const loginCookie = req.headers.cookie?.split(';').find((c) => c.includes('login'));
  const user = loginCookie ? (await api.get('users')).data.filter((u) => u.id === loginCookie.split('=')[1]) : [];

  const comments = await api.get(`comments/${req.params.id}`);
  const commentsData = comments.data.map((c) => (
    c.author === user[0]?.login
      ? { ...c, created_at: new Date(c?.created_at).toUTCString(), isYourComment: true }
      : { ...c, created_at: new Date(c?.created_at).toUTCString() }
  ));

  const shouldEdit = !!req.query.edit && user[0]?.id === news.data[0]?.author;
  const shouldCreate = !!req.query.create && user.length;

  const data = news.data[0] ? {
    ...news.data[0],
    created_at: new Date(news.data[0]?.created_at).toUTCString(),
  } : null;

  res.render('pages/article/article', {
    layout: 'layoutDefault',
    pageTitle: news.data[0]?.title,
    news: {
      data,
      message: news.message,
      errors: news.errors.join(' '),
      shouldEdit,
      shouldCreate,
    },
    comments: {
      ...comments,
      data: commentsData,
    },
    login: !!user.length,
    user: user[0]?.id,
    isArticleDetails: true,
    categories: categories.map((category) => ({ ...category, default: news.data[0]?.category === category.id })),
  });
}

exports.articleController = articleController;
