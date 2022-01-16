/* eslint-disable no-console */

const UsersService = require('../../services/usersService');
const { initialUsers } = require('../../data/initialUsers');

const usersService = new UsersService(initialUsers);

exports.getAllUsers = (_, res) => {
  try {
    const response = usersService.getAllUsers();
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};

exports.register = (req, res) => {
  try {
    const response = usersService.register(req.body);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};

exports.login = (req, res) => {
  try {
    const response = usersService.login(req.body);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};
