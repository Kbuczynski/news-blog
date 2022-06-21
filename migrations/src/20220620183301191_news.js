/* eslint-disable max-len */
const { generateId } = require('../helpers/generateId');

const initialNews = new Array(10);

// eslint-disable-next-line no-plusplus
for (let i = 0; i < initialNews.length; i++) {
  initialNews[i] = {
    id: generateId(),
    title: `${i + 1} news`,
    header: 'The longest header lorem ipsum lorem ipsum lorem i',
    content: 'The longest content lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem ',
    description: 'The longest description lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lo',
    author: '1',
    category: '1',
  };
}

exports.up = (pgm) => {
  pgm.createTable('news', {
    id: {
      type: 'text',
      notNull: true,
      primaryKey: true,
      default: generateId(),
    },
    title: {
      type: 'text',
      notNull: true,
      unique: true,
    },
    header: {
      type: 'text',
      notNull: true,
    },
    content: {
      type: 'text',
      notNull: true,
    },
    description: {
      type: 'text',
      notNull: true,
    },
    author: {
      type: 'text',
      notNull: true,
      references: '"users"',
    },
    category: {
      type: 'integer',
      notNull: true,
      references: '"categories"',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    modified_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.sql(`
    INSERT INTO news VALUES ${initialNews.map((news) => `(
        '${news.id}',
        '${news.title}',
        '${news.header}',
        '${news.content}',
        '${news.description}',
        '${news.author}',
        ${news.category}
      )`).join(', ')}
  `);
};

exports.down = (pgm) => {
  pgm.sql('DELETE FROM news;');
  pgm.dropTable('news');
};
