require('dotenv').config();

const path = require('path');
const cors = require('cors');
const express = require('express');
const handlebars = require('express-handlebars');

const dirHelper = require('./helpers/dirHelper');
const newsRouter = require('./routes/api/newsRouter');
const commentsRouter = require('./routes/api/commentsRouter');
const usersRouter = require('./routes/api/usersRouter');
const homeRouter = require('./routes/homeRouter');
const articleRouter = require('./routes/articleRouter');

const API = require('./helpers/API');
const NewsCommentsFacade = require('./facades/newsCommentsFacade');

const PORT = process.env.PORT || 3000;
const PATH_LAYOUTS = `${__dirname}/views/layouts`;
const PATH_PARTIALS = [
  `${__dirname}/views/partials/atoms`, `${__dirname}/views/partials/molecules`, `${__dirname}/views/partials/organisms`,
];
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

app.engine(
  'hbs',
  handlebars({
    extname: 'hbs',
    defaultLayout: 'defaultLayout',
    layoutsDir: PATH_LAYOUTS,
    partialsDir: PATH_PARTIALS.flatMap((p) => dirHelper.getDirectories(p).map((name) => `${p}/${name}`)),
  }),
);

app.use('*/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.options('*', cors());

global.api = new API(process.env.API_URL);
global.newsCommentsFacade = new NewsCommentsFacade();

app.use('/api/news', newsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);

app.use('/', homeRouter);
app.use('/article', articleRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App is running on http://127.0.0.1:${PORT}`));
