import { component } from '../component/index.js';

class drawer extends component {
  constructor(node) {
    super(node);
  }
  static attachTo(node) {
    return new drawer(node);
  }
  show() {
    this.root.classList.add('pmd-drawer--active');
  }
}

export { drawer };
