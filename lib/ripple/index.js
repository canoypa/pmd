import { component } from '../component/index.js';

class ripple extends component {
  constructor(node) {
    super(node);

    this.inend = false;
    this.pointerup = false;
    this.pointerout = false;
    this.backgroundcolor = 0x9e9e9e; //未使用 色

    this._listener = {
      pointerdown: e => this.rippleStart(e),
      pointerup: e => this.deactive(e),
      pointerout: e => this.deactive(e),
      animationend: e => this.animationend(e)
    };

    this.root.addEventListener('pointerdown', this._listener.pointerdown);
  }
  animationend(e) {
    if (e.animationName === 'in') {
      this.inend = true;
      if (this.pointerup || this.pointerout) this.rippleEnd();
    } else if (e.animationName === 'out') {
      this.root.removeEventListener('animationend', this._listener.animationend);

      this.root.classList.remove('pmd-ripple--active');
      this.root.classList.remove('pmd-ripple--remove');
    }
  }
  deactive(e) {
    if (e.type === 'pointerup') this.pointerup = true;
    else if (e.type === 'pointerout') this.pointerout = true;

    if (this.inend && (this.pointerup || this.pointerout)) this.rippleEnd();
  }
  rippleStart(e) {
    this.root.addEventListener('pointerup', this._listener.pointerup);
    this.root.addEventListener('pointerout', this._listener.pointerout);
    this.root.addEventListener('animationend', this._listener.animationend);

    this.root.classList.remove('pmd-ripple--active');
    this.root.classList.remove('pmd-ripple--remove');

    this.inend = false;
    this.pointerup = false;
    this.pointerout = false;

    const c = this.root.getBoundingClientRect();
    const size = Math.sqrt(c.width ** 2 + c.height ** 2);
    const offsetX = this.unbounded ? c.width / 2 : e.offsetX,
      offsetY = this.unbounded ? c.height / 2 : e.offsetY;

    this.root.style.setProperty('--pmd-ripple-size', `${size}px`);
    this.root.style.setProperty('--pmd-ripple-start', `${offsetX - size / 2}px,${offsetY - size / 2}px`);
    this.root.style.setProperty('--pmd-ripple-end', `${c.width / 2 - size / 2}px,${c.height / 2 - size / 2}px`);

    this.root.classList.add('pmd-ripple--active');
  }
  rippleEnd(e) {
    this.root.removeEventListener('pointerup', this._listener.pointerup);
    this.root.removeEventListener('pointerout', this._listener.pointerout);

    this.inend = false;
    this.pointerup = false;
    this.pointerout = false;

    this.root.classList.add('pmd-ripple--remove');
  }
  get unbounded() {
    return this.root.classList.contains('unbounded');
  }
  set unbounded(b) {
    b ? this.root.classList.add('unbounded') : this.root.classList.remove('unbounded');
  }
  get color() {}
  set color(v) {}
}

export { ripple };
