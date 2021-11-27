const news = {
  id: 0,
  title: "The first news",
  description: "The \"Unleashed\" virtual showcase will likely focus on new MacBooks. he \"Unleashed\" virtual showcase will likely focus on new MacBooks. he \"Unleashed\" virtual showcase will likely focus on new MacBooks.",
  author: "Jan Kowalski",
}

const news1 = {
  id: 0,
  title: "The second news",
  description: "The \"Unleashed\" virtual showcase will likely focus on new MacBooks. he \"Unleashed\" virtual showcase will likely focus on new MacBooks. he \"Unleashed\" virtual showcase will likely focus on new MacBooks.",
  author: "Jan Kowalski",
}

const testNews = Array(20).fill(news)

testNews.push(news1)

exports.getAllNews = (_, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(testNews);
};

exports.getSingleNews = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(news);
};
