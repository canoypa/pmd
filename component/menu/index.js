import * as pmd from '../../lib/pmd.js';

const menu = new pmd.menu(document.querySelector('#demo-menu'));

// document.querySelector('#demo-show-menu').addEventListener('click', e => {
//   menu.show(e);
// });

document.querySelectorAll('.demo-show-menu').forEach(el => {
  el.addEventListener('click', e => menu.show(e));
});
