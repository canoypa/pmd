import { component } from '../component/index.js';

class textField extends component {
  // selectとlinerippleとかを同じコードで処理するためになんか別のクラス作って継いで
  constructor(node) {
    super(node);
    node.pmdTextField = this;

    this.helpertext = null;
    this.restriction = null;
    this.required = false;

    this.evaluationKey = {
      required: /./,
      number: /^\d+/,
      alphabet: /^\w+/,
      mail: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    };

    this.input = this.root.getElementsByClassName('pmd-text-field-input')[0];
    this.text_field = this.root.getElementsByClassName('pmd-text-field')[0];
    this.line_ripple = this.root.getElementsByClassName('pmd-line-ripple')[0];
    this.helper = this.root.getElementsByClassName('pmd-text-field-helper')[0];

    if (this.hasHelper()) {
      this.helpertext = this.helper.textContent;
    }

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

    this.check();
  }
  setEvaluation(reg, error) {
    if (typeof reg === 'string' && this.evaluationKey[reg]) {
      reg = this.evaluationKey[reg];
    }

    this.evaluation = { reg: reg, error: error };
  }
  check() {
    if (this.evaluation.reg.test(this.getValue())) {
      this.setHelper(this.helpertext);
    } else {
      this.setHelper(this.evaluation.error, true);
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
  hasHelper() {
    return this.helper ? true : false;
  }
  getHelper() {
    return this.helpertext;
  }
  setHelper(v, r) {
    if (!v) {
      this.helper.textContent = null;
      this.helpertext = null;
      return;
    }

    const animationend = e => {
      if (e.animationName === 'helper-hiding') {
        this.helper.textContent = v;
        this.helpertext = v;

        if (r === true) {
          this.helper.classList.add('error');
        } else {
          this.helper.classList.remove('error');
        }

        requestAnimationFrame(() => {
          this.helper.classList.remove('hiding');
          this.helper.classList.add('showing');
        });
      } else if (e.animationName === 'helper-showing') {
        this.helper.classList.remove('showing');

        this.helper.removeEventListener('animationend', animationend, { passive: true });
      }
    };

    this.helper.addEventListener('animationend', animationend, { passive: true });

    requestAnimationFrame(() => {
      if (this.hasHelper()) {
        this.helper.classList.add('hiding');
      } else {
        const helper = document.createElement('p');
        if (r === true) {
          this.helper.classList.add('error');
        } else {
          this.helper.classList.remove('error');
        }

        this.root.appendChild(this.helper);
        this.helper = helper;

        this.helper.classList.add('showing');
      }
    });
  }
  hasRequired() {
    return this.required ? true : false;
  }
}

export { textField };
