class menu extends HTMLElement {
  constructor(anker) {
    super();

    this._anker = anker;

    this._shadow = this.attachShadow({ mode: 'closed' });
    this._shadow.innerHTML = menu._tmp;

    this._menu = this._shadow.getElementById('menu');
    this._list = this._shadow.getElementById('list');
    this._scrim = this._shadow.getElementById('scrim');

    this._listener = {
      deactive: e => this.hide(e),
      thenhide: e => this.thenhide(e)
    };
  }
  setItem({ title }) {
    const l = document.createElement('li');
    l.classList.add('list-item');
    l.textContent = title;
    this._list.appendChild(l);
    return this;
  }
  show() {
    document.body.appendChild(this);

    const ac = this._anker.getBoundingClientRect();
    const mc = this._menu.getBoundingClientRect();

    const x = ac.x;
    const y = ac.y;
    const maxleft = window.innerWidth - 8 - mc.width;
    const maxtop = window.innerHeight - 8 - mc.height;

    const rx = x + ac.width > maxleft ? maxleft : x < 4 ? 4 : x;
    const ry = y + ac.height > maxtop ? maxtop : y < 4 ? 4 : y;
    const originX = x + mc.width > window.innerWidth ? 'right' : 'left';
    const originY = y + mc.height > window.innerHeight ? 'bottom' : 'top';
    const translateX = originX === 'left' ? -mc.width : mc.width;
    const translateY = originY === 'top' ? -mc.height : mc.height;

    this._menu.style.top = `${ry}px`;
    this._menu.style.left = `${rx}px`;
    this.style.setProperty('--origin', `${originX} ${originY}`);
    this.style.setProperty('--list-translate', `${translateX}px, ${translateY}px`);

    this._scrim.addEventListener('click', this._listener.deactive);

    requestAnimationFrame(() => this.classList.add('active'));
  }
  hide() {
    this.addEventListener('animationend', this._listener.thenhide);
    requestAnimationFrame(() => this.classList.add('deactive'));
  }
  thenhide(e) {
    if (e.animationName === 'hide') {
      document.body.removeChild(this);
      this.classList.remove('active');
      this.classList.remove('deactive');
    }
  }
  static get _tmp() {
    return `
      <style>
        #menu{
          position: fixed;
          z-index: 8000;
        }
        :host(.active) #menu {
          animation: show-menu 0.2s cubic-bezier(0.4, 0.8, 0.2, 0.96) forwards;
        }
        :host(.deactive) {
          pointer-events: none;
          animation: hide 0.24s forwards;
        }
        
        #bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          background-color: var(--pmd-menu-background, #fff);
          box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
          transform-origin: var(--origin,0 0);
        }
        :host(.active) #bg{
          animation: show-bg 0.3s cubic-bezier(0.4, 0.8, 0.4, 0.96) forwards;
        }
        
        #lc {
          overflow: hidden;
        }

        #list {
          min-width: 120px;
          max-width: 280px;
          width: var(--list-width);
          padding: 6px 0;
          margin: 0;
          list-style-type: none;
        }
        :host(.active) #list {
          animation: show-list 0.3s cubic-bezier(0.4, 0.8, 0.2, 0.96) forwards;
        }

        .list-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          min-width: 80px;
          padding: 0 16px;
          height: 48px;
          color: #333;
          cursor: pointer;
        }
        .list-item::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .list-item:hover::after {
          background-color: rgba(0, 0, 0, 0.05);
        }

        #scrim {
          position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: 7000;
          pointer-events: none;
        }
        :host(.active) #scrim {
          pointer-events: all;
        }

        @keyframes show-menu {
          0% {
            opacity:0;
          }
          100% {
            opacity:1;
          }
        }
        @keyframes show-bg {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes show-list {
          0% {
            transform: translate(var(--list-translate, 0 0));
          }
          100% {
            transform: translate(0, 0);
          }
        }
        @keyframes hide {
          100% {
            opacity: 0;
          }
        }
      </style>
      <div id="scrim"></div>
      <div id="menu">
        <div id="bg"></div>
        <div id="lc">
          <ul id="list"></ul>
        </div>
      </div>
    `;
  }
}

customElements.define('pmd-menu', menu);

export { menu };
