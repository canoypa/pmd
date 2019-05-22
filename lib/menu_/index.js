import { component } from '../component/index.js';

class menu extends component {
  constructor(node) {
    super(node);

    this.menu = this.root.querySelector('.pmd-menu');
    this.list = this.root.querySelector('.pmd-menu-list');
    this.items = this.root.querySelectorAll('.pmd-menu-list-item');
    this.back = this.root.querySelector('.pmd-menu-back');

    this.changeEvent = document.createEvent('CustomEvent');
    this.changeEvent.initEvent('change', false, false);

    this.backclickEventListener = e => this.deactive(e);
    this.animationendEventListener = e => this.animationend(e);
    this.transitionendEventListener = e => this.transitionend(e);
  }
  show() {
    const c = this.menu.getBoundingClientRect();
    const rootX = c.x;
    const rootY = c.y;
    const rootWidth = this.list.offsetWidth;
    const rootHeight = this.list.offsetHeight;
    let orgin = { y: 'top', x: 'left' };

    orgin.y = rootY + rootHeight > window.innerHeight ? 'bottom' : 'top';
    orgin.x = rootX + rootWidth > window.innerWidth ? 'right' : 'left';

    this.list.style.setProperty('--list-width', `${rootWidth}px`);

    this.root.style.setProperty('--pmd-menu-width', `${rootWidth}px`);
    this.root.style.setProperty('--pmd-menu-height', `${rootHeight}px`);
    this.root.style.setProperty('--pmd-menu-list-translate', `-${rootWidth}px, -${rootHeight}px`);
    this.root.style.setProperty('--pmd-menu-origin', `${orgin.y} ${orgin.x}`);

    this.menu.addEventListener('animationend', this.animationendEventListener, { passive: true, once: true });
    this.back.addEventListener('click', this.backclickEventListener, { passive: true, once: true });

    requestAnimationFrame(() => {
      this.root.classList.add('pmd-menu-opening');
      this.root.classList.add('pmd-menu-active');
      this.back.classList.add('active');
    });
  }
  animationend(e) {
    if (e.animationName === 'pmd-menu-show') {
      this.root.classList.remove('pmd-menu-opening');
    }
  }
  transitionend(e) {
    if (e.propertyName === 'opacity') {
      this.root.classList.remove('pmd-menu-active');

      this.root.classList.remove('pmd-menu-deactive');
      this.list.classList.remove('active');
    }
  }
  deactive(e) {
    this.back.removeEventListener('click', this.backclickEventListener, { passive: true, once: true });
    this.menu.addEventListener('transitionend', this.transitionendEventListener, { passive: true, once: true });

    requestAnimationFrame(() => {
      this.root.classList.add('pmd-menu-deactive');
      this.back.classList.remove('active');
    });
  }
}

export { menu };
