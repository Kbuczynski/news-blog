// import API from "../helpers/API.js";

// const api = new API("http://127.0.0.1:3000/api");

// async function getTitles() {
//   const titles = [
//     ...new Set((await api.get("news")).map((news) => dnews.title)),
//   ];
//   return titles;
// }

function getNewsNodes() {
  return [...document.querySelectorAll('.articleThumbnail')];
}

async function searchNews() {
  const searchInput = document.querySelector('.search__input');
  const searchBtn = document.querySelector('.search__btn');
  // const titles = await getTitles();
  const newsNodes = getNewsNodes();
  let searchValue = '';

  searchInput.value = '';

  searchInput.addEventListener('input', (e) => {
    searchValue = e.target.value;
  });

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    newsNodes.forEach((n) => {
      const nodeTitle = n.getAttribute('article-title').toLowerCase();
      const searchTitle = searchValue.toLowerCase();

      if (!nodeTitle.includes(searchTitle)) n.classList.add('articleThumbnail--hide');
      else n.classList.remove('articleThumbnail--hide');
    });
  });
}

export default searchNews;
