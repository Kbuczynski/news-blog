const NewsService = require('./newsService');

const newsList = [
  {
    id: '1',
    title: 'Lorem ipsum',
    header: 'Sample header',
    content: 'Sample content',
    description: 'Sample description',
    author: 'Author One',
  },
];

function response(data) {
  return {
    data: data.news || [],
    message: data.message || '',
    errors: data.errors || [],
  };
}

describe('newsService:', () => {
  let newsService = null;

  beforeEach(() => {
    newsService = new NewsService(newsList);
  });

  describe('constructor', () => {
    it('should return news list if news list was passed', () => {
      const classInstance = new NewsService(newsList);
      expect(classInstance._news).toEqual(newsList);
    });

    it('should return empty array if news list was not passed', () => {
      const classInstance = new NewsService();
      expect(classInstance._news).toEqual([]);
    });
  });

  describe('getAllNews', () => {
    it('should return all news if newsList exist', () => {
      const expected = response({ news: newsList });
      expect(newsService.getAllNews()).toEqual(expected);
    });

    it('should return empty array and proper message if newsList not exist', () => {
      newsService._news = [];
      const expected = response({ message: 'There are no news.' });
      expect(newsService.getAllNews()).toEqual(expected);
    });
  });

  describe('getSingleNews', () => {
    it('should return news with given id if correct id was passed', () => {
      const expected = response({ news: [newsList[0]] });
      expect(newsService.getSingleNews('1')).toEqual(expected);
    });

    it('should return empty array and proper message if correct id was not passed', () => {
      const expected = response({ errors: ['News with given id does not exist.'] });
      expect(newsService.getSingleNews()).toEqual(expected);
    });

    it('should return empty array and proper message if id was incorrect', () => {
      const expected = response({ errors: ['News with given id does not exist.'] });
      expect(newsService.getSingleNews('0')).toEqual(expected);
    });
  });

  describe('addNews', () => {
    it('should add news and return updated newsList and proper message if input was valid', () => {
      const newNews = {
        title: 'Lorem ipsum',
        header: 'Sample header',
        content: 'Sample content',
        description: 'Sample description',
        author: 'Author One',
      };

      const mockSetId = jest.fn();
      NewsService.prototype.setId = mockSetId;
      mockSetId.mockReturnValue('2');

      const expected = response({ news: { id: '2', ...newNews }, message: 'News was added correclty.' });
      expect(newsService.addNews(newNews)).toEqual(expected);
      expect(newsService._news.length).toEqual(2);
    });

    it('should return array with all generic errors messages if input was missing', () => {
      const expected = response({
        errors: ['No news title.', 'No news header.', 'No news content.', 'No news description.', 'No news author.'],
      });
      expect(newsService.addNews()).toEqual(expected);
      expect(newsService._news.length).toEqual(2);
    });

    it('should return array with all "not empty" errors messages if input properties was empty', () => {
      const newNews = {
        title: '',
        header: '',
        content: '',
        description: '',
        author: '',
      };

      const expected = response({
        errors: [
          'Title length can not be empty.',
          'Header length can not be empty.',
          'Content length can not be empty.',
          'Description length can not be empty.',
          'Author length can not be empty.'],
      });
      expect(newsService.addNews(newNews)).toEqual(expected);
      expect(newsService._news.length).toEqual(2);
    });

    it('should return array with all "too long" errors messages if input properties was too long', () => {
      const newNews = {
        title: '#'.repeat(21),
        header: '#'.repeat(51),
        content: '#'.repeat(501),
        description: '#'.repeat(201),
        author: '#'.repeat(51),
      };

      const expected = response({
        errors: [
          'Title length can not be longer than 20.',
          'Header length can not be longer than 50.',
          'Content length can not be longer than 500.',
          'Description length can not be longer than 200.',
          'Author length can not be longer than 50.'],
      });
      expect(newsService.addNews(newNews)).toEqual(expected);
      expect(newsService._news.length).toEqual(2);
    });
  });

  describe('editNews', () => {
    it('should edit news and return updated news with proper message if new news data was correct', () => {
      const newNews = {
        id: '1',
        title: 'Updated title',
        header: 'Updated header',
      };

      const expected = response({ news: [{ ...newsList[0], ...newNews }], message: 'News was edited correclty.' });
      expect(newsService.editNews(newNews)).toEqual(expected);
    });

    it('should return array with proper error message if news with given id not exist', () => {
      const newNews = {
        id: '100',
        title: 'Updated title',
        header: 'Updated header',
      };

      const expected = response({ errors: ['News with given id does not exist.'] });
      expect(newsService.editNews(newNews)).toEqual(expected);
    });

    it('should return array with proper error messages if data was invalid', () => {
      const newNews = {
        id: '1',
        title: '',
        header: 'Updated header',
      };

      const expected = response({ errors: ['Title length can not be empty.'] });
      expect(newsService.editNews(newNews)).toEqual(expected);
    });

    it('should return array with proper error message if additional property was passed', () => {
      const newNews = {
        id: '1',
        test: 'New property',
      };

      const expected = response({ errors: ['Additional property was added.'] });
      expect(newsService.editNews(newNews)).toEqual(expected);
    });

    it('should return array with proper error message if id was missed', () => {
      const newNews = {
        title: 'New title',
      };

      const expected = response({ errors: ['News with given id does not exist.'] });
      expect(newsService.editNews(newNews)).toEqual(expected);
    });
  });

  describe('removeNews', () => {
    it('should remove news and return remowed news and proper message if correct id was passed', () => {
      const expected = response({ news: [newsList[0]], message: 'News was removed correctly' });
      expect(newsService.removeNews('1')).toEqual(expected);
      expect(newsService._news).toEqual([{
        id: '2',
        title: 'Lorem ipsum',
        header: 'Sample header',
        content: 'Sample content',
        description: 'Sample description',
        author: 'Author One',
      }]);
    });

    it('should return empty array and proper message if correct id was not passed', () => {
      const expected = response({ errors: ['News with given id does not exist.'] });
      expect(newsService.removeNews()).toEqual(expected);
    });

    it('should return empty array and proper message if id was incorrect', () => {
      const expected = response({ errors: ['News with given id does not exist.'] });
      expect(newsService.removeNews('100')).toEqual(expected);
      expect(newsService._news.length).toEqual(2);
    });
  });

  describe('isExist', () => {
    it('should return empty array if news exist', () => {
      expect(newsService.isExist('1')).toEqual([]);
    });

    it('should return array with error if news not exist', () => {
      expect(newsService.isExist('100')).toEqual(['News with given id does not exist.']);
    });

    it('should return array with error if id was not passed', () => {
      expect(newsService.isExist()).toEqual(['News with given id does not exist.']);
    });
  });
});
