import { component } from '../component/index.js';

class touchControl {
  constructor() {
    this._scope = document;

    this._pos = document.getElementById('pos');

    this.stamp = 0;
    this.sx = 0;
    this.sy = 0;
    this.ex = 0;
    this.ey = 0;
    this.px = 0;
    this.py = 0;

    this.dx = 0;
    this.dy = 0;
    this.xv = 0;
    this.yv = 0;

    // Velocity

    this._listener = {
      touchstart: e => this.touchstart(e),
      touchmove: e => this.touchmove(e),
      touchend: e => this.touchend(e)
    };
  }
  posele(x, y) {
    const r = document.createElement('div');
    r.style.position = 'fixed';
    r.style.left = `${x}px`;
    r.style.top = `${y}px`;
    r.style.width = '4px';
    r.style.height = '4px';
    r.style.backgroundColor = 'red';

    this._pos.appendChild(r);
  }

  active() {
    this._scope.addEventListener('touchstart', this._listener.touchstart);
  }
  deactive() {
    this._scope.removeEventListener('touchstart', this._listener.touchstart);
  }

  touchstart(e) {
    const touch = e.changedTouches[0];
    this.stamp = e.timeStamp;
    this.sx = touch.screenX;
    this.sy = touch.screenY;
    this.px = touch.screenX;
    this.py = touch.screenY;

    this._scope.addEventListener('touchmove', this._listener.touchmove);
    this._scope.addEventListener('touchend', this._listener.touchend);

    const t = e.target || window;
    const detail = {
      x: touch.screenX,
      y: touch.screenY
    };
    const etm = new CustomEvent('touch:start', { bubbles: true, detail: detail });
    t.dispatchEvent(etm);

    this.posele(touch.pageX, touch.pageY);
  }
  touchmove(e) {
    const touch = e.changedTouches[0];
    this.stamp = e.timeStamp;
    this.dx = touch.screenX - this.sx;
    this.dy = touch.screenY - this.sy;

    const saX = touch.screenX - this.px,
      saY = touch.screenY - this.py,
      sa = saX + saY;

    if (sa > 19 || (sa < -19 && e.timeStamp - this.stamp < 6)) {
      console.log(e);
      const ev = new CustomEvent('touch:swipe');
      window.dispatchEvent(ev);
    }

    this.px = touch.screenX;
    this.py = touch.screenY;

    const t = e.target || window;
    const detail = {
      x: touch.screenX,
      y: touch.screenY
    };
    const etm = new CustomEvent('touch:move', { bubbles: true, detail: detail });
    t.dispatchEvent(etm);

    this.posele(touch.pageX, touch.pageY);
  }
  touchend(e) {
    this._scope.removeEventListener('touchmove', this._listener.touchmove);
    this._scope.removeEventListener('touchend', this._listener.touchend);

    const touch = e.changedTouches[0];
    this.stamp = e.timeStamp;
    this.ex = touch.screenX;
    this.ey = touch.screenY;

    this.dx = this.ex - this.sx;
    this.dy = this.ey - this.sy;

    let r = Math.atan2(this.moveAmountY, this.moveAmountX);
    if (r < 0) r = r + 2 * Math.PI;
    this.angle = ~~((r * 360) / (2 * Math.PI));

    this.px = touch.screenX;
    this.py = touch.screenY;

    console.log(this);

    this.posele(touch.pageX, touch.pageY);
  }
}

class drawer extends component {
  constructor(node) {
    super(node);

    this.tsx = 0;

    this.closeListener = e => this.close();
    this._listener = {
      close: e => this.close(e),
      touchstart: e => this.touchstart(e),
      touchmove: e => this.touchmove(e)
    };

    this.touchControl = new touchControl();

    this.scrim = document.querySelector('.pmd-scrim');
  }
  touchstart(e) {
    window.removeEventListener('touch:start', this._listener.touchstart);

    this.tsx = e.detail.x;

    window.addEventListener('touch:move', this._listener.touchmove);
  }
  touchmove(e) {
    this.root.style.setProperty('--touchX', `${Math.max(Math.min(e.detail.x - this.tsx, 0), -this.root.offsetWidth)}px`);
  }
  open() {
    this.root.classList.add('active');
    this.scrim.classList.add('active');

    this.scrim.addEventListener('click', this.closeListener);
    window.addEventListener('touch:start', this._listener.touchstart);

    this.touchControl.active();
  }
  close(e) {
    this.root.classList.remove('active');
    this.scrim.classList.remove('active');

    this.scrim.removeEventListener('click', this.closeListener);
    window.removeEventListener('touch:move', this._listener.touchmove);

    this.touchControl.deactive();
  }
}

export { drawer };
