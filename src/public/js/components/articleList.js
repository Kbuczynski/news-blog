/* eslint-disable no-undef */

class ArticleList {
  constructor(base, stats) {
    this._base = base;
    this._stats = stats;

    this._deleteButtons = this._base.querySelectorAll('.links__item--delete');
    this._deleteButtonHandler = this._deleteNews.bind(this);
    this._deleteButtons.forEach((b) => b?.addEventListener('click', this._deleteButtonHandler));
  }

  async _deleteNews(e) {
    const newsId = e.target.getAttribute('article-id');
    const response = await api.delete(`news/remove/${newsId}`);

    const postsCounter = this._stats.querySelector('.stats__item');
    const postsCounterValue = +this._stats.querySelector('.stats__item > span').textContent;

    if (!response.errors.length) {
      e.target.parentNode.parentNode.remove();
      postsCounter.innerHTML = `News created: <span>${postsCounterValue - 1}</span>`;
    }
  }
}

export default ArticleList;
