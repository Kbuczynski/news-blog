const { generateId } = require('../helpers/generateId');

const initialUsers = [
  { id: '1', login: 'admin', password: '12345678' },
  { id: generateId(), login: 'jan', password: 'jan12345' },
  { id: generateId(), login: 'anna', password: 'anna1234' },
];

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'text',
      notNull: true,
      primaryKey: true,
      unique: true,
      default: generateId(),
    },
    login: {
      type: 'text',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'text',
      notNull: true,
    },
  });

  pgm.sql(`
    INSERT INTO users VALUES ${initialUsers.map((user) => `(
        '${user.id}',
        '${user.login}',
        '${user.password}'
      )`).join(', ')};
  `);
};

exports.down = (pgm) => {
  pgm.sql('DELETE FROM admin;');
  pgm.dropTable('admin');
};
