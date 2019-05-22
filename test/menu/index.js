import * as pmd from '/lib/pmd.js';

const menu = new pmd.menu(document.getElementById('menu'));
console.log(menu);

document.getElementById('button').addEventListener('click', e => {
  menu.show(e);
});
