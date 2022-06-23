/* eslint-disable no-console */

const UsersService = require('../../services/usersService');

const usersService = new UsersService();

exports.getAllUsers = async (_, res) => {
  try {
    const response = await usersService.getAllUsers();
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};

exports.register = async (req, res) => {
  try {
    const response = await usersService.register(req.body);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};

exports.login = async (req, res) => {
  try {
    const response = await usersService.login(req.body);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};
