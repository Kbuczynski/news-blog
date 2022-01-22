const TemplateService = require('../helpers/templateService');

class NewsService extends TemplateService {
  constructor(news) {
    super();
    this._news = news || [];
  }

  getAllNews() {
    let message = '';
    const data = this._news;
    if (!data.length) message = 'There are no news.';
    return this.createResponse({ data, message });
  }

  getSingleNews(id) {
    const errors = this.isExist(id);
    const data = this._news.filter((n) => n.id === id);
    return this.createResponse({ data, errors });
  }

  addNews(news) {
    let message = '';
    const errors = this._validate(news);
    let data = [];

    if (!errors.length) {
      data = {
        id: this.setId(),
        ...news,
      };
      this._news.push(data);
      message = 'News was added correclty.';
    }

    return this.createResponse({ data, message, errors });
  }

  editNews(news) {
    let message = '';
    const errors = this.isExist(news.id);
    const oldNews = this._news.filter((n) => n.id === news.id);
    const updatedNews = {
      ...oldNews[0],
      ...news,
    };
    !errors.length
      && this._validate(updatedNews).length
      && errors.push(this._validate(updatedNews));

    if (!errors.length) {
      this._news = this._news.map((n) => (n.id === news.id ? updatedNews : n));
      message = 'News was edited correclty.';
    }

    return this.createResponse({ data: updatedNews, message, errors });
  }

  removeNews(id) {
    let message = '';
    const errors = this.isExist(id);
    let data = [];

    if (!errors.length) {
      data = this._news.filter((n) => n.id === id);
      this._news = this._news.filter((n) => n.id !== id);
      message = 'News was removed correctly';
    }

    return this.createResponse({ data, message, errors });
  }

  _validate(news = {}) {
    const {
      title, header, content, description, author,
    } = news;
    const errors = [];

    if (typeof title !== 'string') {
      errors.push('No news title.');
    } else if (title.length === 0) errors.push('Title length can not be empty.');
    else if (title.length > 20) errors.push('Title length can not be longer than 20.');

    if (typeof header !== 'string') {
      errors.push('No news header.');
    } else if (header.length === 0) errors.push('Header length can not be empty.');
    else if (header.length > 50) errors.push('Header length can not be longer than 50.');

    if (typeof content !== 'string') {
      errors.push('No news content.');
    } else if (content.length === 0) errors.push('Content length can not be empty.');
    else if (content.length > 500) errors.push('Content length can not be longer than 250.');

    if (typeof description !== 'string') {
      errors.push('No news description.');
    } else if (description.length === 0) errors.push('Description length can not be empty.');
    else if (description.length > 200) errors.push('Description length can not be longer than 250.');

    if (typeof author !== 'string') {
      errors.push('No news author.');
    } else if (author.length === 0) errors.push('Author length can not be empty.');
    else if (author.length > 50) errors.push('Author length can not be longer than 50.');

    return errors;
  }

  isExist(id) {
    const errors = [];
    if (!id || !this._news.some((n) => n.id === id)) errors.push('News with given id does not exist.');
    return errors;
  }
}

module.exports = NewsService;
