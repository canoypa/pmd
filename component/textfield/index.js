import * as pmd from '../../lib/pmd.js';

document.querySelectorAll('.demo-text-field').forEach(tf => {
  new pmd.textField(tf);
});
