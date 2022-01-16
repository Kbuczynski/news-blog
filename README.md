# news-blog


## Setup

```sh
npm i && npm start
```
## Development

### Using Docker

```sh
npm run dev:docker:build
```

### Using npm scripts

```sh
npm i && npm run dev
```

## REST API

### News
| Name  | Method | Path | Body |
| ----- | ------ | ---- | ---- |
| getAllNews | GET | /api/news/ | -
| getSingleNews | GET | /api/news/:id | -
| addNews | POST | /api/news/add | title, header, content, description, author
| editNews | PUT | /api/news/edit | title, header, content, description, author
| removeNews | DELETE | /api/news/remove/:id | -

### Comments
| Name | Method | Path | Body |
| ---- | ------ | ---- | ---- |
| getComments | GET | /api/comments/:newsId | -
| addComment | POST | /api/comments/add/ | newsId, content, author
| removeComment | DELETE | /api/comments/remove/:id | -

### Users
| Name | Method | Path | Body |
| ---- | ------ | ---- | ---- |
| getAllUsers | GET | /api/users/ | -
| register | POST | /api/users/register | login, password
| login  | POST | /api/users/login | login, password

## Packages

| Package | README |
| ------ | ------ |
| Express | https://www.npmjs.com/package/express |
| Handlebars | https://www.npmjs.com/package/handlebars |
| SASS | https://www.npmjs.com/package/node-sass |
