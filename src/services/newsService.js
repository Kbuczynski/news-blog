const TemplateService = require('../helpers/templateService');
const NewsRepository = require('../repositories/newsRepository');

class NewsService extends TemplateService {
  constructor() {
    super();
    this._repository = new NewsRepository();
    this._newsProperties = ['id', 'title', 'header', 'content', 'description', 'author', 'category', 'created_at'];
  }

  async getAllNews() {
    let message = '';
    const data = await this._repository.getAllNews();
    if (!data.length) message = 'There are no news.';
    return this.createResponse({ data, message });
  }

  async getSingleNews(id) {
    const errors = [];
    let data = await this._repository.getSingleNews(id);

    try {
      data = await this._repository.getSingleNews(id);
    } catch (e) {
      errors.push(e.message);
    }

    return this.createResponse({ data, errors });
  }

  async addNews(news) {
    let message = '';
    const errors = this._validate(news);
    let data = [];

    if (!errors.length) {
      try {
        data = await this._repository.addNews(news);
        message = 'News was added correctly.';
      } catch (e) {
        errors.push(e.message);
      }
    }

    return this.createResponse({ data, message, errors });
  }

  async editNews(news) {
    let message = '';
    const errors = this._validate(news);
    const data = [];

    !this.isProperData(this._newsProperties, news) && errors.push('Additional property was added.');

    if (!errors.length) {
      try {
        data.push(await this._repository.editNews(news));
        message = 'News was edited correctly.';
      } catch (e) {
        errors.push(e.message);
      }
    }

    return this.createResponse({ data, message, errors });
  }

  async removeNews(id) {
    let message = '';
    const errors = [];
    let data = [];

    if (!errors.length) {
      try {
        data = await this._repository.removeNews(id);
        message = 'News was removed correctly';
      } catch (e) {
        errors.push(e.message);
      }
    }

    return this.createResponse({ data, message, errors });
  }

  _validate(news = {}) {
    const {
      title, header, content, description,
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
    else if (content.length > 500) errors.push('Content length can not be longer than 500.');

    if (typeof description !== 'string') {
      errors.push('No news description.');
    } else if (description.length === 0) errors.push('Description length can not be empty.');
    else if (description.length > 200) errors.push('Description length can not be longer than 200.');

    return errors;
  }
}

module.exports = NewsService;
