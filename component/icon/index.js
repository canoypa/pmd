import * as pmd from '../../lib/pmd.js';

document.querySelector('#transition').addEventListener('click', e => {
    pmd.icon.transition(document.querySelector('.demo-icon'), 'accessibility');
});
