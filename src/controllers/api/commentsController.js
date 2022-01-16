/* eslint-disable no-console, no-undef */

// TODO: handle nested comments

exports.getComments = (req, res) => {
  try {
    const response = newsCommentsFacade.getComments(req.params.newsId);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};

exports.addComment = (req, res) => {
  try {
    const response = newsCommentsFacade.addComment(req.body);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};

exports.removeComment = (req, res) => {
  try {
    const response = newsCommentsFacade.removeComment(req.params.id);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong.');
  }
};
