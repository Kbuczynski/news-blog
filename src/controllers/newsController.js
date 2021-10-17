const news = {
  id: 0,
  title: "The first news",
  header: "This is header!",
  description: "The \"Unleashed\" virtual showcase will likely focus on new MacBooks.",
  img: "https://picsum.photos/200/300",
  author: "Jan Kowalski",
}

const testNews = Array(20).fill(news)

exports.getAllNews = (_, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(testNews);
};

exports.getSingleNews = (req, res) => {
  res.status(200).send("single news " + req.params.id);
};
