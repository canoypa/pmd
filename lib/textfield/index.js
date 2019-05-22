import { component } from '../component/index.js';

class textField extends component {
  constructor(node) {
    super(node);
    node.pmdTextField = this;

    this.input = this.root.querySelector('.pmd-text-field-input');
    this.text_field = this.root.querySelector('.pmd-text-field');
    this.line_ripple = this.root.querySelector('.pmd-line-ripple');

    if (this.hasValue()) {
      this.root.classList.add('pmd-text-field--hasvalue');
    }

    this.pointerdownEventListener = e => this.pointerdownHandler(e);
    this.focusEventListener = e => this.focusHandler(e);
    this.blurEventListener = e => this.blurHandler(e);
    this.changeEventListener = e => this.changeHandler(e);

    this.text_field.addEventListener('pointerdown', this.pointerdownEventListener);
    this.input.addEventListener('focus', this.focusEventListener, { passive: true });
    this.input.addEventListener('blur', this.blurEventListener, { passive: true });
    this.input.addEventListener('change', this.changeEventListener, { passive: true });
  }
  pointerdownHandler(e) {
    if (this.line_ripple) {
      this.line_ripple.style.setProperty('--pmd-text-field-line-ripple-origin', `${e.offsetX}px center`);
    }
  }
  focusHandler(e) {
    this.root.classList.add('pmd-text-field--focus');
    if (this.line_ripple) {
      this.line_ripple.classList.add('pmd-line-ripple--active');
    }
  }
  blurHandler() {
    this.root.classList.remove('pmd-text-field--focus');
    if (this.line_ripple) this.line_ripple.classList.remove('pmd-line-ripple--active');
    if (this.input.value) {
      this.root.classList.add('pmd-text-field--hasvalue');
    } else {
      this.root.classList.remove('pmd-text-field--hasvalue');
    }
  }
  changeHandler() {
    this.root.classList.remove('pmd-text-field--focus');
    if (this.line_ripple) this.line_ripple.classList.remove('pmd-line-ripple--active');
    if (this.input.value) {
      this.root.classList.add('pmd-text-field--hasvalue');
    } else {
      this.root.classList.remove('pmd-text-field--hasvalue');
    }
  }
  hasValue() {
    return this.input.value ? true : false;
  }
  setValue(val) {
    this.input.value = val;
    if (this.hasValue()) {
      this.root.classList.add('pmd-text-field--hasvalue');
    }
  }
  getValue() {
    return this.input.value;
  }
}

export { textField };
