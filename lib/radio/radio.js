import { component } from '../component/index.js';
import { ripple } from '../ripple/index.js';

class radio extends component {
  constructor(node) {
    super(node);

    new ripple(this.root);

    this.listener = {
      change: e => this.change(e)
    };

    this.input = this.root.querySelector('input');
    this.back = this.root.querySelector('.pmd-checkbox-background');
    this.mark = this.root.querySelector('.pmd-checkbox-checkmark');

    this.root.addEventListener('click', this.listener.change);
  }
  change(e) {
    console.log(this.input.getAttribute('checked'));
    this.root.classList.toggle('checked');
  }
}

export { radio };
