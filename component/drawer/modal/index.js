import * as pmd from '/lib/pmd.js';

const drawer = new pmd.drawer(document.querySelector('#demo-drawer'));

document.querySelector('#demo-drawer-trigger').addEventListener('click', e => {
  drawer.show();
});
