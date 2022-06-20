const initialCategories = [
  { name: 'default' },
  { name: 'sport' },
  { name: 'music' },
  { name: 'cooking' },
  { name: 'coding' },
];

exports.up = (pgm) => {
  pgm.createTable('categories', {
    id: {
      type: 'serial',
      notNull: true,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: 'text',
      notNull: true,
      unique: true,
    },
  });

  pgm.sql(`
    INSERT INTO categories VALUES ${initialCategories.map((category, i) => `(
        ${i + 1},
        '${category.name}'
    )`).join(', ')}
  `);
};

exports.down = (pgm) => {
  pgm.sql('DELETE FROM categories;');
  pgm.dropTable('categories');
};
