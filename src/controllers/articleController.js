const API = require("../helpers/API");

async function articleController(req, res) {
  const api = new API(process.env.API_URL);
  const news = await api.get(`news/${req.params.id}`);

  res.render("pages/article/article", {
    layout: "layoutDefault",
    pageTitle: news.title,
    news: news
  })
}

exports.articleController = articleController;
