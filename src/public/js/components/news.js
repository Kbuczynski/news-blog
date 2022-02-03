/* eslint-disable no-undef */

class News {
  constructor(base) {
    this._base = base;

    this._updateButton = this._base.querySelector('.article-content__update');
    this._updateButtonHandler = this._updateNews.bind(this);
    this._updateButton?.addEventListener('click', this._updateButtonHandler);

    this._createButton = this._base.querySelector('.article-content__create');
    this._createButtonHandler = this._createNews.bind(this);
    this._createButton?.addEventListener('click', this._createButtonHandler);

    this._message = this._base.querySelector('#article-message');
  }

  get newsId() {
    const urlParts = window.location.href.split('/');
    return urlParts[urlParts.length - 1].substring(0, urlParts[urlParts.length - 1].indexOf('?'));
  }

  _createMessage(text, node) {
    // eslint-disable-next-line no-param-reassign
    node.textContent = Array.isArray(text) ? text.join(' ') : text;
  }

  _responseHandler(response) {
    if (response.errors.length) {
      this._message.classList.add('info--error');
      this._createMessage(response.errors, this._message);
    } else {
      this._message.classList.remove('info--error');
      this._createMessage(response.message, this._message);
    }
  }

  async _updateNews(e) {
    e.preventDefault();
    const title = this._base.querySelector('.article-content__title').textContent;
    const header = this._base.querySelector('.article-content__header').textContent;
    const content = this._base.querySelector('.article-content__content').textContent;
    const description = this._base.querySelector('.article-content__description').textContent;

    const response = await api.put('news/edit', {
      id: this.newsId, title, header, content, description,
    });

    this._responseHandler(response);
  }

  async _createNews(e) {
    e.preventDefault();
    const title = this._base.querySelector('.article-content__title').textContent;
    const header = this._base.querySelector('.article-content__header').textContent;
    const content = this._base.querySelector('.article-content__content').textContent;
    const description = this._base.querySelector('.article-content__description').textContent;
    const author = this._base.querySelector('.article-content__author').textContent;

    const response = await api.post('news/add', {
      title, header, content, description, author,
    });

    this._responseHandler(response);

    if (!response.errors.length) {
      // eslint-disable-next-line no-param-reassign, no-return-assign
      this._base.querySelectorAll('*[contenteditable]').forEach((el) => el.textContent = '');
    }
  }
}

export default News;
