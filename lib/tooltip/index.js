import { component } from '../component/index.js';

class tooltip extends component {
  constructor(node) {
    super(node);

    this.hov = null;
    this.hidden = true;

    this.pointerenterListener = e => this.pointerenter(e);
    this.pointerleaveListener = e => this.pointerleave(e);
    this.transitionendListener = e => this.transitionend(e);

    document.addEventListener('pointerenter', this.pointerenterListener, { capture: true, passive: true });
  }
  pointerenter(e) {
    if (e.target.matches && e.target.matches('[data-pmd-tooltip]')) {
      this.hov = e.target;

      const c = e.target.getBoundingClientRect();
      this.root.textContent = e.target.getAttribute('data-pmd-tooltip');

      let kibou_top = c.top + c.height + 8;
      this.root.style.top = `${kibou_top < window.innerHeight - this.root.offsetHeight - 16 ? kibou_top : c.top - this.root.offsetHeight - 8}px`;

      let kibou_left = c.left + c.width / 2 - this.root.offsetWidth / 2;
      let max_left = window.innerWidth - this.root.offsetWidth - 8;
      this.root.style.left = `${kibou_left > 8 ? (kibou_left < max_left ? kibou_left : max_left) : 8}px`;

      requestAnimationFrame(() => {
        this.root.setAttribute('aria-hidden', false);
      });

      this.root.addEventListener('transitionend', this.transitionendListener, { passive: true });
      this.hov.addEventListener('pointerleave', this.pointerleaveListener, { passive: true });
    }
  }
  pointerleave(e) {
    if (e.target.matches('[data-pmd-tooltip]')) {
      this.root.setAttribute('aria-hidden', true);
      this.hov.removeEventListener('pointerleave', this.pointeroutListener, { passive: true });
      this.hov = null;
    }
  }
  transitionend(e) {}
}

export { tooltip };
