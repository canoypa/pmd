import { appbar } from './appbar/index.js';
import { autoInit } from './autoinit/index.js';
import { createDialog } from './dialog/index.js';
import { ripple } from './ripple/index.js';
import { select } from './select/index.js';
import { snackbar } from './snackbar/index.js';
import { tab } from './tab/index.js';
import { textField } from './textfield/index.js';
import { tooltip } from './tooltip/index.js';

autoInit.register('ripple', ripple);
autoInit.register('select', select);
autoInit.register('snackbar', snackbar);
autoInit.register('tab', tab);
autoInit.register('textField', textField);

export {
	appbar,
	autoInit,
	createDialog,
	ripple,
	select,
	snackbar,
	tab,
	textField,
	tooltip
}
