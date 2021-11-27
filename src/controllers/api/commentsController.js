// TODO: handle comments

exports.getComments = (_, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(testNews);
};

exports.addComment = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(news);
};

exports.removeComment = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(news);
};
