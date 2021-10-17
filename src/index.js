require("dotenv").config();

const path = require("path");
const cors = require("cors");
const express = require("express");
const handlebars = require("express-handlebars");

const dirHelper = require("./helpers/dirHelper");
const newsRouter = require("./routes/api/newsRouter");
const homeRouter = require("./routes/homeRouter");

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

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

// REST API routes
app.use("/api/news", newsRouter);

// users views routes
app.use("/", homeRouter);
app.get("/article", (_, res) =>
  res.render("pages/article/article", {
    layout: "layoutDefault",
    articelId: 123,
    pageTitle: "article name",
  })
);

app.listen(PORT, () =>
  console.log(`App is running on http://127.0.0.1:${PORT}`)
);
