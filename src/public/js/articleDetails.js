import Comments from './components/comments.js';
import News from './components/news.js';

const commentsContainer = document.querySelector('.article__comments');
commentsContainer && new Comments(commentsContainer);

const articleContent = document.querySelector('.article-content');
articleContent && new News(articleContent);
