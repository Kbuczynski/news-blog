/* eslint-disable max-len */

const { generateId } = require('../helpers/generateId');

const news1 = {
  id: generateId(),
  title: 'The first news',
  header: 'header 123',
  content: 'very long content teested!!!!!!',
  description:
    'The "Unleashed" virtual showcase will likely focus on new MacBooks. he "Unleashed" virtual showcase will likely focus on new MacBooks. he "Unleashed" virtual showcase will likely focus on new MacBooks.',
  author: 'Jan Kowalski',
};

const news2 = {
  ...news1,
  title: 'second',
  id: generateId(),
};

const news3 = {
  id: generateId(),
  title: 'The longest title lo',
  header: 'The longest header lorem ipsum lorem ipsum lorem i',
  content: 'The longest content lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem ',
  description: 'The longest description lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lo',
  author: 'Johnnnnnnnnnnnnnnnnnnnnn Doeeeeeeeeeeeeeeeeeeeeeee',
};

const initialNews = [news1, news2, news3];

exports.initialNews = initialNews;
