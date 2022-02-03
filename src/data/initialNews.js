/* eslint-disable max-len */

const { generateId } = require('../helpers/generateId');

const arr = new Array(10);

// eslint-disable-next-line no-plusplus
for (let i = 0; i < arr.length; i++) {
  arr[i] = {
    id: generateId(),
    title: `${i + 1} news`,
    header: 'The longest header lorem ipsum lorem ipsum lorem i',
    content: 'The longest content lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem ',
    description: 'The longest description lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lo',
    author: 'admin',
  };
}

const initialNews = arr;

exports.initialNews = initialNews;
