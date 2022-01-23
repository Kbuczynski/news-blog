const { generateId } = require('./generateId');

describe('generateId', () => {
  it('should return random uniqe id', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toEqual(id2);
  });

  it('should return id with string type', () => {
    const id = generateId();
    expect(typeof id === 'string' || id instanceof String).toEqual(true);
  });
});
