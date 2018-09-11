import { component } from '../component/index.js';

class appbar extends component {
    constructor(node) {
        super(node);

        document.addEventListener('scroll', e => this.scrollE(e), { passive: true });
    }
    scrollE(e) {
        if (this.root.classList.contains('pmd-top-appbar--prominent')) {
            if (window.scrollY <= 0) {
                this.root.querySelectorAll('.pmd-top-appbar-section').forEach(el => {
                    el.style.height = '';
                });
                this.root.querySelector('.pmd-top-appbar-title').style.fontSize = '1.5em';
            }
            else if (window.scrollY < 64) {
                this.root.querySelectorAll('.pmd-top-appbar-section').forEach(el => {
                    el.style.height = (128 - window.scrollY) + 'px';
                });
                this.root.querySelector('.pmd-top-appbar-title').style.fontSize = (1.5 - (((1.5 - 1.25) / 64) * window.scrollY)) + 'em';
            }
            else {
                this.root.querySelectorAll('.pmd-top-appbar-section').forEach(el => {
                    el.style.height = '64px';
                });
                this.root.querySelector('.pmd-top-appbar-title').style.fontSize = '1.25em';
            }
        }
    }
}

export { appbar }
