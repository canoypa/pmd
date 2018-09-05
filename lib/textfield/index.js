class textField extends component {
    constructor(node) {
        super(node);

        this.input = this.root.querySelector('.pmd-text-field-input');
        this.line_ripple = this.root.querySelector('.pmd-line-ripple');

        if (this.input.value) { this.root.classList.add('pmd-text-field--hasvalue') }

        this.input.addEventListener('focus', e => {
            this.root.classList.add('pmd-text-field--focus');
            if (this.line_ripple) this.line_ripple.classList.add('pmd-line-ripple--active');
        });
        this.input.addEventListener('blur', e => {
            this.root.classList.remove('pmd-text-field--focus');
            if (this.line_ripple) this.line_ripple.classList.remove('pmd-line-ripple--active');
            if (this.input.value) { this.root.classList.add('pmd-text-field--hasvalue') } else { this.root.classList.remove('pmd-text-field--hasvalue') }
        });
    }
    attach(node) { return new textField(node) }
    getValue() { return this.input.value }
    setValue(val) { this.input.value = val }
}

export { textField }
