import { component } from '../component/index.js';

class snackbar extends component {
    constructor(node) {
        super(node);
        this.save = [];
        this.processing = false;

        this.root.querySelector('.pmd-snackbar-action-button').addEventListener('click', () => this.remove());
    }
    create(set, fn) {
        const snack_set = {
            message: set.message,
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

        this.root.classList.add(set.vertical);
        this.root.classList.add(set.horizontal);
        this.root.querySelector('.pmd-snackbar-text').textContent = set.message;
        this.root.querySelector('.pmd-snackbar-action-button').textContent = set.actionText;

        this.root.classList.add('pmd-snackbar-active');

        setTimeout(() => this.remove(), set.timeout);
    }
    remove() {
        this.root.addEventListener('transitionend', () => {
            this.save.shift();
            this.processing = false;
            this.putRequest();
        }, { once: true });
        this.root.classList.remove('pmd-snackbar-active');
    }
    putRequest() {
        if (this.getProcessing && this.havWaitingSnack) { this.put() }
    }
    get havWaitingSnack() { return this.save.length > 0 ? true : false }
    get getProcessing() { return !this.processing }
}

export { snackbar }
