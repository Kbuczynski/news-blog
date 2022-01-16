const { generateId } = require('../helpers/generateId');

const initialUsers = {
  admin: { id: generateId(), password: '123456', login: 'Admin' },
  jan: { id: generateId(), password: 'jan1234', login: 'Jan' },
  anna: { id: generateId(), password: 'anna1234', login: 'Anna' },
};

exports.initialUsers = initialUsers;
