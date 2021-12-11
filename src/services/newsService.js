class NewsService {
  validate(news) {
    const errors = [];

    if (typeof news.title !== "string") {
      errors.push("No news title.");
    } else {
      if (news.title.length === 0)
        errors.push("Title length can not be empty.");
      else if (news.title.length > 20)
        errors.push("Title length can not be longer than 20.");
    }

    if (typeof news.header !== "string") {
      errors.push("No news header.");
    } else {
      if (news.header.length === 0)
        errors.push("Header length can not be empty.");
      else if (news.header.length > 50)
        errors.push("Header length can not be longer than 50.");
    }

    if (typeof news.content !== "string") {
      errors.push("No news content.");
    } else {
      if (news.content.length === 0)
        errors.push("Content length can not be empty.");
      else if (news.content.length > 500)
        errors.push("Content length can not be longer than 250.");
    }

    if (typeof news.description !== "string") {
      errors.push("No news description.");
    } else {
      if (news.description.length === 0)
        errors.push("Description length can not be empty.");
      else if (news.description.length > 200)
        errors.push("Description length can not be longer than 250.");
    }

    if (typeof news.author !== "string") {
      errors.push("No news author.");
    } else {
      if (news.author.length === 0)
        errors.push("Author length can not be empty.");
      else if (news.author.length > 50)
        errors.push("Author length can not be longer than 50.");
    }

    if (errors.length) throw new Error(JSON.stringify(errors));
    return true;
  }

  isExist(newsList, id) {
    if (!newsList.some((n) => n.id === id)) {
      throw new Error(JSON.stringify(["News with given id does not exist."]));
    }

    return true;
  }
}

module.exports = NewsService;
