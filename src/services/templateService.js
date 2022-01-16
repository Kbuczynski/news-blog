class TemplateService {
  createResponse({ data, message = '', errors = [] }) {
    return {
      data,
      message,
      errors: errors.flat(Infinity),
    };
  }
}

module.exports = TemplateService;
