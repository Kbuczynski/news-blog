const { generateId } = require("../helpers/generateId");

const id1 = generateId(),
  id2 = generateId();

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
  title: "second",
  id: id2,
};

const initialNews = [news1, news2]

exports.initialNews = initialNews;
