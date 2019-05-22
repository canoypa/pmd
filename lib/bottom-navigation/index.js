import { component } from '../component/index.js';

class bottomNavigation extends component {
  constructor(node) {
    super(node);

    this.items = this.root.querySelectorAll('.pmd-bottom-navigation-item');

    console.log(this.items);

    this.itemSelectEventListener = e => this.change(e);

    for (let el of this.items) {
      el.addEventListener('click', this.itemSelectEventListener);
    }
  }
  static attachTo(node) {
    return new bottomNavigation(node);
  }
  change(e) {
    console.log(e);
  }
}

export { bottomNavigation };
