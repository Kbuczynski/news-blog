function handleSearchParam(value) {
  window.location.href = `${window.location.origin}?search=${value}`;
}

const searchInput = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__submit');
let searchValue = '';

// eslint-disable-next-line no-return-assign
searchInput.addEventListener('input', (e) => searchValue = e.target.value);

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  handleSearchParam(searchValue);
});
