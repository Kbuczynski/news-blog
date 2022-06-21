import ArticleList from './components/articleList.js';

const list = document.querySelector('.articles-list');
const stats = document.querySelector('.stats');
list && new ArticleList(list, stats);

const addNewsButton = document.querySelector('.settings__add-news > button');
// eslint-disable-next-line no-return-assign
addNewsButton?.addEventListener('click', () => window.location.href = `${window.location.origin}/article/new?create=true`);

const categoryFilter = document.querySelector('#category');
categoryFilter?.addEventListener('input', (e) => {
  e.preventDefault();
  const { value } = e.target;
  window.location.href = `${window.location.origin}/profile?filter=category&type=${value}`;
});
