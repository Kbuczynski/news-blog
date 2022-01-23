import API from './helpers/API.js';

window.api = new API(`${window.location.origin}/api`);

if (!document.cookie.match('login')) document.cookie = 'login=false;path=/';
