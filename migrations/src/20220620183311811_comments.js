const { generateId } = require('../helpers/generateId');

exports.up = (pgm) => {
  pgm.createTable('comments', {
    id: {
      type: 'text',
      notNull: true,
      primaryKey: true,
      default: generateId(),
    },
    news: {
      type: 'text',
      notNull: true,
      references: '"news"',
    },
    author: {
      type: 'text',
      notNull: true,
      references: '"users"',
    },
    content: {
      type: 'text',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.sql('DELETE FROM comments;');
  pgm.dropTable('comments');
};