import Menu from './components/menu.js';
import './components/search.js';

const headerContainer = document.querySelector('.header');
headerContainer && new Menu(headerContainer);
