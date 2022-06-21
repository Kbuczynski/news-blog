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

  isProperData(availableProperties, data) {
    return !Object.keys(data).filter((key) => !availableProperties.includes(key)).length;
  }
}

module.exports = TemplateService;
