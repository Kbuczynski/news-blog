async function articleController(req, res) {
  const news = await api.get(`news/${req.params.id}`);
  const comments = await api.get(`comments/${req.params.id}`);

  res.render("pages/article/article", {
    layout: "layoutDefault",
    pageTitle: news.data[0].title,
    news: news,
    comments: comments
  });
}

exports.articleController = articleController;
