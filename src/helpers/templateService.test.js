const TemplateService = require('./templateService');

const templateService = new TemplateService();

describe('TemplateService:', () => {
  describe('setId', () => {
    it('should return random uniqe id', () => {
      const id1 = templateService.setId();
      const id2 = templateService.setId();
      expect(id1).not.toEqual(id2);
    });

    it('should return id with string type', () => {
      const id = templateService.setId();
      expect(typeof id === 'string' || id instanceof String).toEqual(true);
    });
  });
});
