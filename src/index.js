require("dotenv").config();

const path = require("path");
const cors = require("cors");
const express = require("express");
const handlebars = require("express-handlebars");

const dirHelper = require("./helpers/dirHelper");
const newsRouter = require("./routes/api/newsRouter");
const commentsRouter = require("./routes/api/commentsRouter");
const homeRouter = require("./routes/homeRouter");
const articleRouter = require("./routes/articleRouter");

const API = require("./helpers/API");
const NewsCommentsFacade = require("./facades/newsCommentsFacade");

const PORT = process.env.PORT || 3000;
const PATH_PARTIALS = `${__dirname}/views/partials/`;
const PATH_LAYOUTS = `${__dirname}/views/layouts`;
const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultLayout: "defaultLayout",
    layoutsDir: PATH_LAYOUTS,
    partialsDir: dirHelper
      .getDirectories(PATH_PARTIALS)
      .map((name) => `${PATH_PARTIALS}${name}`),
  })
);

app.use("*/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.options("*", cors());

global.api = new API(process.env.API_URL);
global.newsCommentsFacade = new NewsCommentsFacade();

app.use("/api/news", newsRouter);
app.use("/api/comments", commentsRouter);

app.use("/", homeRouter);
app.use("/article", articleRouter);

app.listen(PORT, () =>
  console.log(`App is running on http://127.0.0.1:${PORT}`)
);
