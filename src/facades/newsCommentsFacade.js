const NewsService = require("../services/newsService");
const CommentsService = require("../services/commentsService");

const { initialNews } = require("../data/initialNews");
const { generateInitialComments } = require("../data/initialComments");

class NewsCommentsFacade {
  constructor() {
    this._newsService = new NewsService(initialNews);
    this._commentsService = new CommentsService(
      generateInitialComments(initialNews[0].id)
    );
  }

  isNewsExist = (id) => {
    return this._newsService.isExist(id);
  };

  getAllNews() {
    return this._newsService.getAllNews();
  }

  getSingleNews(id) {
    return this._newsService.getSingleNews(id);
  }

  addNews(news) {
    return this._newsService.addNews(news);
  }

  editNews(news) {
    return this._newsService.editNews(news);
  }

  removeNews(id) {
    return this._newsService.removeNews(id);
  }

  getComments(newsId) {
    return this._commentsService.getComments(newsId, this.isNewsExist);
  }

  addComment(comment) {
    return this._commentsService.addComment(comment, this.isNewsExist);
  }

  removeComment(id) {
    return this._commentsService.removeComment(id);
  }
}

module.exports = NewsCommentsFacade;
