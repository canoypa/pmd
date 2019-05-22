import * as pmd from '../../lib/pmd.js';

const tab = new pmd.tab(document.querySelector('#demo-tab'));
const scrolltab = new pmd.tab(document.querySelector('#demo-tab-scroll'));

for (let r of document.querySelectorAll('.pmd-ripple')) {
    new pmd.ripple(r);
}

