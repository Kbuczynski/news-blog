const { generateId } = require('./generateId');

class TemplateService {
  createResponse({ data, message = '', errors = [] }) {
    return {
      data,
      message,
      errors: errors.flat(Infinity),
    };
  }

  setId() {
    return generateId();
  }
}

module.exports = TemplateService;
