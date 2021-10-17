const API = require("../helpers/API");

async function homeController(_, res) {
  const api = new API("http://127.0.0.1:3000/api");
  const news = await api.get("news");

  res.render("pages/home/home", {
    layout: "layoutDefault",
    pageTitle: "home",
    news: news
  });
}

exports.homeController = homeController;
