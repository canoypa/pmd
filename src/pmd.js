import { createDialog } from './dialog/index';
import { ripple } from './ripple/index';
import { select } from './select/index';
import { snackbar } from './snackbar/index';
import { tab } from './tab/index';
import { tooltip } from './tooltip/index';

export {
	createDialog,
	autoInit,
	ripple,
	select,
	snackbar,
	tab
}



// class AppBar extends HTMLElement{
//   constructor(){
//     super();
//   }
// }
// customElements.define('app-bar',AppBar);
//
// class SnackBar extends HTMLElement{
//   constructor(){
//     super();
//   }
//   connectedCallback(){
//     (this.getAttribute('place'))?this.setAttribute('place',this.getAttribute('place')):this.setAttribute('place','bottom');
//     (this.getAttribute('motion'))?this.setAttribute('motion',this.getAttribute('motion')):this.setAttribute('motion','up');
//   }
// }
// customElements.define('snack-bar',SnackBar);
//
// class RippleEffect extends HTMLElement{
//   constructor(){
//     super();
//   }
// }
// customElements.define('ripple-effect',RippleEffect);
