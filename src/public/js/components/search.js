const searchBtn = document.querySelector('.search__submit');

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const searchValue = document.querySelector('.search__input').value;
  window.location.href = `${window.location.origin}?search=${searchValue}`;
});
