import ArticleList from './components/articleList.js';
import Comments from './components/comments.js';

const list = document.querySelector('.articles-list');
const stats = document.querySelector('.stats');
list && new ArticleList(list, stats);

const commentsContainer = document.querySelector('.profile__articles');
commentsContainer && new Comments(commentsContainer);

const addNewsButton = document.querySelector('.settings__add-news > button');
// eslint-disable-next-line no-return-assign
addNewsButton?.addEventListener('click', () => window.location.href = `${window.location.origin}/article/new?create=true`);

function handleQueryPrams(param, value) {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  params.set(param, value);
  url.search = params.toString();

  return url.toString();
}

const modifiedFilter = document.querySelector('#modified');
modifiedFilter?.addEventListener('input', (e) => {
  e.preventDefault();
  const { value } = e.target;
  window.location.href = handleQueryPrams('modified', value);
});

const categoryFilter = document.querySelector('#category');
categoryFilter?.addEventListener('input', (e) => {
  e.preventDefault();
  const { value } = e.target;
  window.location.href = handleQueryPrams('category', value);
});

const createdFilter = document.querySelector('#created');
createdFilter?.addEventListener('input', (e) => {
  e.preventDefault();
  const { value } = e.target;
  window.location.href = handleQueryPrams('created', value);
});

const resetFilters = document.querySelector('.reset-filters');
resetFilters.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/profile';
});
