import CommentService from './components/commentService.js';

const commentsContainer = document.querySelector('.article__comments');
// eslint-disable-next-line no-new
commentsContainer && new CommentService(commentsContainer);
