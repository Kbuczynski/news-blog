/* eslint-disable no-console, no-undef */
const NewsService = require('../../services/newsService');

const newsService = new NewsService();

exports.getAllNews = async (_, res) => {
  try {
    const response = await newsService.getAllNews();
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};

exports.getSingleNews = async (req, res) => {
  try {
    const response = await newsService.getSingleNews(req.params.id);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};

exports.addNews = async (req, res) => {
  try {
    const response = await newsService.addNews(req.body);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};

exports.editNews = async (req, res) => {
  try {
    const response = await newsService.editNews(req.body);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};

exports.removeNews = async (req, res) => {
  try {
    const response = await newsService.removeNews(req.params.id);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};
