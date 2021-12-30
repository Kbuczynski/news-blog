async function homeController(_, res) {
  const newsList = await api.get("news");

  res.render("pages/home/home", {
    layout: "layoutDefault",
    pageTitle: "Home",
    newsList: newsList.data,
    message: newsList.message,
    errors: newsList.errors,
  });
}

exports.homeController = homeController;
