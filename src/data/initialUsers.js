const { generateId } = require('../helpers/generateId');

const initialUsers = [
  { id: generateId(), password: '123456', login: 'Admin' },
  { id: generateId(), password: 'jan1234', login: 'Jan' },
  { id: generateId(), password: 'anna1234', login: 'Anna' },
];

exports.initialUsers = initialUsers;
