const { v1: uuidv1 } = require("uuid");

const id1 = uuidv1(),
  id2 = uuidv1();

const news1 = {
  id: id1,
  title: "The first news",
  header: "header 123",
  content: "very long content teested!!!!!!",
  description:
    'The "Unleashed" virtual showcase will likely focus on new MacBooks. he "Unleashed" virtual showcase will likely focus on new MacBooks. he "Unleashed" virtual showcase will likely focus on new MacBooks.',
  author: "Jan Kowalski",
};

const news2 = {
  ...news1,
  id: id2,
};

const initialNews = Array(1).fill(news1)
initialNews.push(news2)

exports.initialNews = initialNews;
