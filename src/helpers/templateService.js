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

  isProperData(avaibleProperties, data) {
    return !Object.keys(data).filter((key) => !avaibleProperties.includes(key)).length;
  }
}

module.exports = TemplateService;
