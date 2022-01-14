import API from "./helpers/API.js";

import searchNews from "./components/search.js";

window.api = new API("http://127.0.0.1:3000/api");

searchNews();