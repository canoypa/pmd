const ACTIVATION_EVENTS = ['mousedown', 'touchstart'];
const DEACTIVATION_EVENTS = ['mouseup', 'touchend'];

class component {
	constructor(node) {
		this.root = node;
	}
}

class ripple extends component {
	constructor(node) {
		super(node);

		for (let et of ACTIVATION_EVENTS) {
			node.addEventListener(et, this.mouseDown, { passive: true });
		}

		for (let et of DEACTIVATION_EVENTS) {
			node.addEventListener(et, this.mouseUp, { passive: true });
		}
	}
	attach(node) { return new ripple(node) }
	mouseDown(e) {
		const testdiv = document.createElement('div');
		testdiv.style.position = 'absolute';
		testdiv.style.top = e.offsetY + 'px';
		testdiv.style.left = e.offsetX + 'px';
		testdiv.style.width = '1px';
		testdiv.style.height = '1px';
		testdiv.style.backgroundColor = '#f00';
		// this.appendChild(testdiv);

		const rippleSize = (this.offsetWidth > this.offsetHeight ? this.offsetWidth : this.offsetHeight) * 1.4;

		this.style.setProperty('--pmd-ripple-size', `${rippleSize}px`);
		this.style.setProperty('--pmd-ripple-start', `${e.offsetX - (rippleSize / 2)}px,${e.offsetY - (rippleSize / 2)}px`);
		this.style.setProperty('--pmd-ripple-end', `${this.offsetWidth / 2 - (rippleSize / 2)}px,${this.offsetHeight / 2 - (rippleSize / 2)}px`);
		this.classList.add('pmd-ripple-active');
	}
	mouseUp(e) {
		this.classList.remove('pmd-ripple-active');
	}
}

class selector extends component {
	constructor(node) {
		super(node);

		this.selectChangeEvent = document.createEvent('HTMLEvents');
		this.selectChangeEvent.initEvent('change', true, true);

		this.items = this.root.querySelectorAll('option');

		this.selectedIndexValue = null;

		this.root.querySelector('select').addEventListener('change', e => {
			this.selectedIndex = e.currentTarget.selectedIndex;
		});
	}
	attach(node) { return new selector(node) }
	on(type, fn, op) { this.root.addEventListener(type, fn, op) }
	set selectedIndex(i) {
		if (this.selectedIndex !== i) {
			this.selectedIndexValue = i;

			this.root.dispatchEvent(this.selectChangeEvent);
		}
	}
	get selectedIndex() { return this.selectedIndexValue }
	get value() { return this.items[this.selectedIndex].value }
}

class tab extends component {
	constructor(node) {
		super(node);

		this.selectedIndexValue = null;

		this.selectChangeEvent = document.createEvent('HTMLEvents');
		this.selectChangeEvent.initEvent('change', true, true);

		this.items = this.root.querySelectorAll('.pmd-tab-item');

		window.addEventListener('resize', this.resize, { passive: true });
		this.init();
	}
	attach(node) { return new tab(node) }
	init() {
		const par = [].slice.call(this.items);
		const selectTab = this.root.querySelector('.pmd-tab-item[aria-selected="true"]') ? this.root.querySelector('.pmd-tab-item[aria-selected="true"]') : this.root.querySelector('.pmd-tab-item');
		const index = par.indexOf(selectTab);
		this.selectedIndex = index;

		for (let ei of this.root.querySelectorAll('.pmd-tab-item')) {
			ei.addEventListener('click', e => {
				const par = [].slice.call(this.items);
				const index = par.indexOf(e.currentTarget);
				this.selectedIndex = index;
			}, { passive: true });
		}
	}
	set selectedIndex(i) {
		if (this.selectedIndex !== i) {
			this.selectedIndexValue = i;
			for (let e of this.root.querySelectorAll('.pmd-tab-item[aria-selected="true"]')) {
				e.setAttribute('aria-selected', false);
			}
			this.items[i].setAttribute('aria-selected', true);

			const tabs = this.root.querySelector('.pmd-tab-scroller');
			const scroll = this.items[i].offsetLeft + this.items[i].offsetWidth / 2 - tabs.offsetWidth / 2;
			$(tabs).animate({ scrollLeft: scroll }, 200);// TODO:

			this.root.style.setProperty('--tab-Indicator-width', `${this.items[i].clientWidth}px`);
			this.root.style.setProperty('--tab-Indicator-left', `${this.items[i].offsetLeft}px`);
			this.root.style.setProperty('--tab-Indicator-right', `${this.root.offsetWidth - (this.items[i].offsetLeft + this.items[i].offsetWidth)}px`);

			this.root.dispatchEvent(this.selectChangeEvent);
		}
	}
	get selectedIndex() { return this.selectedIndexValue }
	get value() { return 0 }
	set indicatorColor(code) { this.root.querySelector('.pmd-tab-Indicator').backgroundColor = code }
	on(type, fn, op) { this.root.addEventListener(type, fn, op) }
	resize() { }
}

class Snackbar {
	constructor() {
		this.save = [];
		this.processing = false;

		const snackbar = document.createElement('div'); snackbar.classList.add('pmd-snackbar');
		const text = document.createElement('div'); text.classList.add('pmd-snackbar-text');
		const button = document.createElement('button'); button.classList.add('pmd-snackbar-action-button'); button.classList.add('pmd-button');

		button.addEventListener('click', () => this.remove());

		snackbar.appendChild(text);
		snackbar.appendChild(button);

		document.body.appendChild(snackbar);
	}
	create(set, fn) {
		const snack_set = {
			text: set.text,
			actionText: set.actionText || null,
			actionHandler: fn,
			vertical: set.vertical || 'bottom',
			horizontal: set.horizontal || 'left',
			timeout: set.timeout || '2000'
		}
		this.save.push(snack_set);
		this.putRequest();
	}
	put() {
		this.processing = true;
		const set = this.save[0];
		const snackbar = document.querySelector('.pmd-snackbar');

		snackbar.classList.add(set.vertical);
		snackbar.classList.add(set.horizontal);
		snackbar.querySelector('.pmd-snackbar-text').textContent = set.text;
		snackbar.querySelector('.pmd-snackbar-action-button').textContent = set.actionText;

		snackbar.classList.add('pmd-snackbar-active');

		setTimeout(() => this.remove(), set.timeout);
	}
	remove() {
		const snackbar = document.querySelector('.pmd-snackbar');
		snackbar.addEventListener('transitionend', () => {
			this.save.shift();
			this.processing = false;
			this.putRequest();
		}, { once: true });
		snackbar.classList.remove('pmd-snackbar-active');
	}
	putRequest() {
		if (this.getProcessing && this.havWaitingSnack) { this.put() }
	}
	get havWaitingSnack() { return this.save.length > 0 ? true : false }
	get getProcessing() { return !this.processing }
}
const snackbar = new Snackbar();

function tooltip() {
	const tooltip = document.createElement('div'); tooltip.id = 'pmd-tooltip'; tooltip.setAttribute('aria-hidden', true);
	document.body.appendChild(tooltip);

	document.on('mouseover', '*[data-pmd-tooltip]', e => {
		const c = e.currentTarget_.getBoundingClientRect();
		tooltip.textContent = e.currentTarget_.getAttribute('data-pmd-tooltip');
		tooltip.style.top = ((c.top - (tooltip.getAttribute('aria-hidden') === true ? tooltip.offsetHeight / .9 : tooltip.offsetHeight) - 8 >= 8) ? (c.top - ((tooltip.getAttribute('aria-hidden') === true ? tooltip.offsetHeight / .9 : tooltip.offsetHeight) / .9) - 4) : (c.top + c.height + 4)) + 'px';
		tooltip.style.left = (((c.left + (c.width / 2)) - (tooltip.offsetWidth / 2) >= 8) ? (((c.left + (c.width / 2)) - (tooltip.offsetWidth / 2) <= document.body.offsetWidth - (tooltip.getAttribute('aria-hidden') === true ? tooltip.offsetWidth / .9 : tooltip.offsetWidth) - 8) ? ((c.left + (c.width / 2)) - (tooltip.offsetWidth / 2)) : (document.body.offsetWidth - (tooltip.getAttribute('aria-hidden') === true ? tooltip.offsetWidth / .9 : tooltip.offsetWidth) - 8)) : (8)) + 'px';
		tooltip.setAttribute('aria-hidden', false);
	});
	document.on('mouseout', '*[data-pmd-tooltip]', e => {
		tooltip.setAttribute('aria-hidden', true);
	});
}

const createAlert = function (obj) {
	const container = document.createElement('div'); container.classList.add('pmd-dialog');
	const dialog = document.createElement('div'); dialog.classList.add('pmd-dialog-dialog');
	const header = document.createElement('header'); header.classList.add('pmd-dialog-header');
	const title = document.createElement('h3'); title.classList.add('pmd-dialog-title'); title.textContent = obj.title;
	const body = document.createElement('div'); body.classList.add('pmd-dialog-body');
	const footer = document.createElement('footer'); footer.classList.add('pmd-dialog-footer');
	const buttons = document.createElement('div'); buttons.classList.add('pmd-dialog-buttons');

	for (let t of obj.body) {
		const a = document.createElement('div');
		a.textContent = t;
		body.appendChild(a);
	}
	for (let o of obj.actions) {
		const b = document.createElement('button'); b.classList.add('pmd-button'); b.classList.add('pmd-button-flat'); b.classList.add('pmd-dialog-footer-button--accept'); b.textContent = o.text;
		if (o.action) { b.addEventListener('click', e => o.action(e)) }
		b.addEventListener('click', e => remove());
		buttons.appendChild(b);
	}

	container.appendChild(dialog);
	dialog.appendChild(header);
	header.appendChild(title);
	dialog.appendChild(body);
	dialog.appendChild(footer);
	footer.appendChild(buttons);

	document.body.appendChild(container);

	function remove() {
		container.remove();
	}
}

const registry = {};
function autoInit() {
	const nodes = document.querySelectorAll('[data-pmd-auto-init]');

	for (let i = 0, node; (node = nodes[i]); i++) {
		const ctorName = node.dataset.pmdAutoInit;
		if (!ctorName) { throw new Error('(pmd-auto-init) Constructor name must be given.') }

		const n = new registry[ctorName](node);
	}

	tooltip();
}
autoInit.register = function (componentName, Ctor) {
	registry[componentName] = Ctor;
}
autoInit.register('ripple', ripple);

export {
	autoInit,
	ripple,
	selector,
	tab,
	snackbar,
	createAlert
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
