import * as pmd from '/lib/pmd.js';

const textfield = new pmd.textField(document.getElementById('dev-text-field'));

textfield.setEvaluation('mail', 'メールアドレスを入力してください');
