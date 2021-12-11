const { initialNews } = require("../../data/initialNews");
const NewsService = require("../../services/newsService");
const { v1: uuidv1 } = require("uuid");

let news = initialNews;
const newsService = new NewsService();

exports.getAllNews = (_, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(news);
};

exports.getSingleNews = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  try {
    const { id } = req.params;
    newsService.isExist(news, id)
    res.status(200).send(news.filter((n) => n.id === id));
  } catch (err) {
    res.status(400).send({ errors: JSON.parse(err.message) });
  }
};

exports.addNews = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  try {
    const { title, header, content, description, author } = req.body;
    newsService.validate(req.body)
    news.push({
      id: uuidv1(),
      title,
      header,
      content,
      description,
      author,
    });
    res.status(200).send(news);
  } catch (err) {
    res.status(400).send({ errors: JSON.parse(err.message) });
  }  
};

exports.editNews = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  try {
    const { id, title, header, content, description, author } = req.body;
    newsService.validate(req.body)
    newsService.isExist(news, id)
    news = news.map((n) =>
      n.id === id
        ? {
            ...n,
            title,
            header,
            content,
            description,
            author,
          }
        : n
    );
    res.status(200).send(news);
  } catch (err) {
    res.status(400).send({ errors: JSON.parse(err.message) });
  }
};

exports.removeNews = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  try {
    const { id } = req.params;
    newsService.isExist(news, id)
    news = news.filter((n) => n.id !== id);
    res.status(200).send(news);
  } catch (err) {
    res.status(400).send({ errors: JSON.parse(err.message) });
  }
};
