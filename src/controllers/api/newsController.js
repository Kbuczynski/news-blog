exports.getAllNews = (_, res) => {
  try {
    const response = newsCommentsFacade.getAllNews();
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Something went wrong.");
  }
};

exports.getSingleNews = (req, res) => {
  try {
    const response = newsCommentsFacade.getSingleNews(req.params.id);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Something went wrong.");
  }
};

exports.addNews = (req, res) => {
  try {
    const response = newsCommentsFacade.addNews(req.body);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Something went wrong.");
  }
};

exports.editNews = (req, res) => {
  try {
    const response = newsCommentsFacade.editNews(req.body);
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Something went wrong.");
  }
};

exports.removeNews = (req, res) => {
  try {
    const response = newsCommentsFacade.removeNews(req.params.id)
    res.status(200).send(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Something went wrong.");
  }
};
