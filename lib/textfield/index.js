import { component } from '../component/index.js';

class textField extends component {
    constructor(node) {
        super(node);
        node.pmdTextField = this;

        this.input = this.root.querySelector('.pmd-text-field-input');
        this.line_ripple = this.root.querySelector('.pmd-line-ripple');

        if (this.hasValue()) { this.root.classList.add('pmd-text-field--hasvalue') }

        this.input.addEventListener('focus', e => {
            this.root.classList.add('pmd-text-field--focus');
            if (this.line_ripple) this.line_ripple.classList.add('pmd-line-ripple--active');
        });
        this.input.addEventListener('blur', e => {
            this.root.classList.remove('pmd-text-field--focus');
            if (this.line_ripple) this.line_ripple.classList.remove('pmd-line-ripple--active');
            if (this.input.value) { this.root.classList.add('pmd-text-field--hasvalue') } else { this.root.classList.remove('pmd-text-field--hasvalue') }
        });
        this.input.addEventListener('change', e => {
            this.root.classList.remove('pmd-text-field--focus');
            if (this.line_ripple) this.line_ripple.classList.remove('pmd-line-ripple--active');
            if (this.input.value) { this.root.classList.add('pmd-text-field--hasvalue') } else { this.root.classList.remove('pmd-text-field--hasvalue') }
        });
    }
    hasValue() { return (this.input.value) ? true : false }
    setValue(val) { this.input.value = val; if (this.hasValue()) { this.root.classList.add('pmd-text-field--hasvalue') } }
    getValue() { return this.input.value }
}

export { textField }
