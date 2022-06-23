/* eslint-disable no-console, no-undef */
const CommentsService = require('../../services/commentsService');

const commentsService = new CommentsService();

// TODO: handle nested comments

exports.getComments = async (req, res) => {
  try {
    const response = await commentsService.getComments(req.params.newsId);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};

exports.addComment = async (req, res) => {
  try {
    const response = await commentsService.addComment(req.body);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};

exports.removeComment = async (req, res) => {
  try {
    const response = await commentsService.removeComment(req.params.id);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};
