const API = require("../helpers/API");

async function homeController(_, res) {
  const api = new API(process.env.API_URL);
  const newsList = await api.get("news");

  res.render("pages/home/home", {
    layout: "layoutDefault",
    pageTitle: "home",
    newsList
  });
}

exports.homeController = homeController;
