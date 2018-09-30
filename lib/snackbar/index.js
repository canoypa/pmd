import { component } from '../component/index.js';

class snackbar extends component {
    constructor(node) {
        super(node);

        this.stack = [];
        this.processing = false;

        this.timeout = null;

        this.text = this.root.querySelector('.pmd-snackbar-text');
        this.actionButton = this.root.querySelector('.pmd-snackbar-action-button');

        this.snackEndEventHandler = e => this.remove();
        this.outAnimationEndEventHandler = e => this.outanimationend(e);
    }
    create(set, fn) {
        if (!set.message) {
            throw new Error('missing values');
        }
        const snack_set = {
            message: set.message,
            actionText: set.actionText,
            actionHandler: fn || null,
            timeout: set.timeout || 2500
        }
        this.stack.push(snack_set);

        this.putRequest();
    }
    putRequest() {
        if (!this.getGetProcessing() && this.getHavWaitingSnack()) {
            this.put();
        }
    }
    put() {
        this.processing = true;

        const set = this.stack.shift();

        this.text.textContent = set.message;
        this.actionButton.textContent = set.actionText;
        this.actionButton.addEventListener('click', this.snackEndEventHandler);

        requestAnimationFrame(() => {
            this.root.classList.add('pmd-snackbar-active');
            this.timeout = setTimeout(() => this.remove(), set.timeout);
        });
    }
    remove() {
        clearTimeout(this.timeout);

        this.actionButton.removeEventListener('click', this.snackEndEventHandler);
        this.root.addEventListener('animationend', this.outAnimationEndEventHandler, { once: true });

        requestAnimationFrame(() => {
            this.root.classList.add('pmd-snackbar-deactive');
        });
    }
    outanimationend(e) {
        if (e.animationName === 'pmd-snackbar-out') {
            this.root.classList.remove('pmd-snackbar-deactive');
            this.root.classList.remove('pmd-snackbar-active');
            this.text.textContent = null;
            this.actionButton.textContent = null;
            this.processing = false;
            this.putRequest();
        }
    }
    getGetProcessing() { return this.processing }
    getHavWaitingSnack() { return this.stack.length > 0 ? true : false }
}

export { snackbar }
