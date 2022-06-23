/* eslint-disable no-undef */
const NewsRepository = require('../repositories/newsRepository');
const CategoriesRepository = require('../repositories/categoriesRepository');
const CommentsRepository = require('../repositories/commentsRepository');

// eslint-disable-next-line consistent-return
async function profileController(req, res) {
  const newsRepository = new NewsRepository();
  const categoriesRepository = new CategoriesRepository();
  const commentsRepository = new CommentsRepository();

  const categories = (await categoriesRepository.getAll())
    .map((category) => ({ ...category, default: +req.query.category === category.id }));

  const loginCookie = req.headers.cookie?.split(';').find((c) => c.includes('login'));
  const user = loginCookie ? (await api.get('users')).data.filter((u) => u.id === loginCookie.split('=')[1]) : [];

  const newsData = (await newsRepository.getNewsByAuthor(loginCookie.split('=')[1], req.query.modified, req.query.category))
    .map((news) => ({ ...news, edit: true }));

  const comments = (await commentsRepository.getCommentsByAuthor(user[0]?.id, req.query.created))
    .map((comment) => ({
      ...comment, created_at: new Date(comment.created_at).toUTCString(), isYourComment: true, isProfile: true,
    }));

  const showComments = req.query.view === 'comments';

  if (!user.length) return res.redirect('/error?isAccessError=true');

  res.render('pages/profile/profile', {
    layout: 'layoutDefault',
    pageTitle: 'Profile',
    newsList: {
      data: newsData,
      message: !newsData.length && 'There are no news. Let\'s create new one!',
    },
    stats: {
      countNews: newsData.length,
      countComments: comments.length,
    },
    login: !!user.length,
    user: user[0] || [],
    isProfile: true,
    showComments,
    categories,
    modifiedDefault: req.query.modified === 'ASC',
    createdDefault: req.query.created === 'ASC',
    comments: { data: comments, message: !comments.length && 'No comments created.' },
  });
}

exports.profileController = profileController;
