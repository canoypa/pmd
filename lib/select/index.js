import { component } from "../component/index.js";

class select extends component {
    constructor(node) {
        super(node);

        this.selectChangeEvent = document.createEvent('HTMLEvents');
        this.selectChangeEvent.initEvent('change', true, true);

        this.items = this.root.querySelectorAll('option');
        this.control = this.root.querySelector('.pmd-select-control');
        this.line_ripple = this.root.querySelector('.pmd-line-ripple');

        if (this.control.selectedIndex) { this.root.classList.add('pmd-select--hasvalue') }

        this.control.addEventListener('focus', e => {
            this.root.classList.add('pmd-select--focus');
            if (this.line_ripple) this.line_ripple.classList.add('pmd-line-ripple--active');
        });
        this.control.addEventListener('blur', e => {
            this.root.classList.remove('pmd-select--focus');
            if (this.line_ripple) this.line_ripple.classList.remove('pmd-line-ripple--active');
        });

        this.control.addEventListener('change', e => {
            this.root.classList.remove('pmd-text-field--focus');
            if (this.control.value) { this.root.classList.add('pmd-select--hasvalue') } else { this.root.classList.remove('pmd-select--hasvalue') }
            this.selectedIndex = e.currentTarget.selectedIndex;
        });
    }
    attach(node) { return new selector(node) }
    setSelectedIndex(i) {
        if (this.control.selectedIndex !== i) {
            this.control.selectedIndex = i;

            this.root.dispatchEvent(this.selectChangeEvent);
        }
    }
    getSelectedIndex() { return this.control.selectedIndex }
    getValue() { return this.items[this.control.selectedIndex].value }
}

export { select }
