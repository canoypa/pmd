import { component } from '../component/index.js';

class ripple extends component {
  constructor(node) {
    super(node);

    this.animationend = false;
    this.pointerup = false;
    this.pointerout = false;
    this.unbounded = false;//未使用　固定かどうか
    this.backgroundcolor = 0x9E9E9E;//未使用 色

    if (this.root.classList.contains('pmd-ripple-unbounded')) { this.setUnbounded(true) }

    this.pointerdownEventListener = e => this.rippleStart(e);
    this.pointerupEventListener = e => this.deactiveHandler(e);
    this.pointeroutEventListener = e => this.deactiveHandler(e);
    this.animationendEventListener = e => this.animationendHandler(e);

    this.root.addEventListener('pointerdown', this.pointerdownEventListener, { passive: true });
  }
  deactiveHandler(e) {
    if (e.type === 'pointerup') {
      this.pointerup = true;
    }
    else if (e.type === 'pointerout') {
      this.pointerout = true;
    }

    if (this.animationend === true && (this.pointerup === true || this.pointerout === true)) { this.rippleEnd() }
  }
  animationendHandler(e) {
    if (e.animationName === 'pmd-ripple-in') {
      this.animationend = true;
      if (this.animationend === true && (this.pointerup === true || this.pointerout === true)) { this.rippleEnd() }
    }
    else if (e.animationName === 'pmd-ripple-out') {
      this.root.classList.remove('pmd-ripple--active');
      this.root.classList.remove('pmd-ripple--remove');
    }
  }
  rippleStart(e) {
    this.root.addEventListener('pointerup', this.pointerupEventListener, { passive: true });
    this.root.addEventListener('pointerout', this.pointeroutEventListener, { passive: true });
    this.root.addEventListener('animationend', this.animationendEventListener, { passive: true });

    this.root.classList.remove('pmd-ripple--active');
    this.root.classList.remove('pmd-ripple--remove');

    this.animationend = false;
    this.pointerup = false;
    this.pointerout = false;

    const c = e.currentTarget.getBoundingClientRect();
    const rippleSize = Math.sqrt(Math.pow(c.width, 2) + Math.pow(c.height, 2));
    let offsetX, offsetY;
    if (e.currentTarget.classList.contains('pmd-ripple-unbounded') || this.getUnbounded() === true) {
      offsetX = (e.currentTarget.offsetWidth / 2);
      offsetY = (e.currentTarget.offsetWidth / 2);
    }
    else if (e.type === 'pointerdown') {
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    }

    this.root.style.setProperty('--pmd-ripple-size', `${rippleSize}px`);
    this.root.style.setProperty('--pmd-ripple-start', `${offsetX - (rippleSize / 2)}px,${offsetY - (rippleSize / 2)}px`);
    this.root.style.setProperty('--pmd-ripple-end', `${this.root.offsetWidth / 2 - (rippleSize / 2)}px,${this.root.offsetHeight / 2 - (rippleSize / 2)}px`);

    this.root.classList.add('pmd-ripple--active');
  }
  rippleEnd(e) {
    this.root.removeEventListener('pointerup', this.pointerupEventListener, { passive: true });
    this.root.removeEventListener('pointerout', this.pointeroutEventListener, { passive: true });
    this.root.removeEventListener('animationend', this.animationendEventListener, { passive: true });

    this.animationend = false;
    this.pointerup = false;
    this.pointerout = false;

    this.root.classList.add('pmd-ripple--remove');
  }
  getUnbounded() {
    return this.unbounded;
  }
  setUnbounded(v) {
    this.unbounded = v;
  }
  setColor(v) {//色指定
  }
}

export { ripple }
