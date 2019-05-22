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

    this.selectItemEventListener = e => this.change(e);
    this.backclickEventListener = e => this.deactive(e);
    this.animationendEventListener = e => this.animationend(e);
    this.transitionendEventListener = e => this.transitionend(e);

    this.items.forEach(el => {
      el.addEventListener('click', this.selectItemEventListener, { passive: true });
    });
  }
  static attachTo(node) {
    return new menu(node);
  }
  change(e) {
    console.log(e);
  }
  animationend(e) {
    if (e.animationName === 'pmd-menu-show') {
      // this.root.dispatchEvent(this.activeEvent);
      this.list.classList.add('active');
      this.root.classList.remove('pmd-menu-opening');
    }
    this.menu.removeEventListener('animationend', this.animationendEventListener, { passive: true });
  }
  transitionend(e) {
    if (e.propertyName === 'opacity') {
      this.root.classList.remove('pmd-menu-active');
      this.root.classList.remove('pmd-menu-deactive');
      this.list.classList.remove('active');
      this.list.style.width = null;
    }
  }
  show(e) {
    this.menu.removeEventListener('animationend', this.animationendEventListener, { passive: true });
    this.back.removeEventListener('click', this.backclickEventListener, { passive: true });
    this.menu.removeEventListener('transitionend', this.transitionendEventListener, { passive: true });

    this.list.classList.add('active');
    this.root.classList.remove('pmd-menu-opening');
    this.root.classList.remove('pmd-menu-active');
    this.root.classList.remove('pmd-menu-deactive');
    this.list.classList.remove('active');
    this.list.style.width = null;

    const c = this.menu.getBoundingClientRect();
    const rootX = c.x;
    const rootY = c.y;
    const rootWidth = this.list.offsetWidth;
    const rootHeight = this.list.offsetHeight;

    if (window.innerHeight - rootY > rootHeight) {
      this.menu.style.top = 0;
    } else {
      this.menu.style.bottom = 0;
    }

    if (window.innerWidth - rootX > rootWidth) {
      this.menu.style.left = 0;
    } else {
      this.menu.style.right = 0;
    }

    this.list.style.width = rootWidth + 'px';

    // this.root.style.setProperty('--pmd-menu-x', e.offsetX + 'px');
    // this.root.style.setProperty('--pmd-menu-y', e.offsetY + 'px');
    this.root.style.setProperty('--pmd-menu-show-offsetX', e.offsetX + 'px');
    this.root.style.setProperty('--pmd-menu-show-offsetY', e.offsetY + 'px');
    this.root.style.setProperty('--pmd-menu-show-width-start', 0 + 'px');
    this.root.style.setProperty('--pmd-menu-show-height-start', 0 + 'px');
    this.root.style.setProperty('--pmd-menu-show-width-end', rootWidth + 'px');
    this.root.style.setProperty('--pmd-menu-show-height-end', rootHeight + 'px');
    this.root.style.setProperty('--pmd-menu-show-list-translateX', -rootWidth + 'px');
    this.root.style.setProperty('--pmd-menu-show-list-translateY', -rootHeight + 'px');
    this.list.style.setProperty('--pmd-menu-show-list-origin', `${e.offsetX}px ${e.offsetY}px`);

    this.menu.addEventListener('animationend', this.animationendEventListener, { passive: true });
    this.back.addEventListener('click', this.backclickEventListener, { passive: true });

    requestAnimationFrame(() => {
      this.root.classList.add('pmd-menu-opening');
      this.root.classList.add('pmd-menu-active');
      this.back.classList.add('active');
    });
  }
  deactive(e) {
    this.menu.addEventListener('transitionend', this.transitionendEventListener, { passive: true });
    requestAnimationFrame(() => {
      this.root.classList.add('pmd-menu-deactive');
      this.back.classList.remove('active');
    });
  }
}

export { menu };
