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
      onDelete: 'cascade',
    },
    author: {
      type: 'text',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
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
