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

export { snackbar }
