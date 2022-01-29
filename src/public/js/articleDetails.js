import Comments from './components/comments.js';

const commentsContainer = document.querySelector('.article__comments');
commentsContainer && new Comments(commentsContainer);
