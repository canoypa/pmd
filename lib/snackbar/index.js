class snackbar extends HTMLElement {
  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'closed' });
    this._shadow.innerHTML = snackbar._tmp;

    this._title = this._shadow.getElementById('title');
    this._actions = this._shadow.getElementById('actions');

    this._stack = [];
    this._isopen = false;

    this._listener = {
      animationend: e => this._animationend(e)
    };

    document.body.appendChild(this);
  }
  isOpen() {
    return this._isopen;
  }

  set({ title = '', actions = [], timeout = 2000 }) {
    this._stack.push({ title, actions, timeout });
  }
  show() {
    if (this._stack.length > 0 && this.isOpen() === false) this._show(this._stack.pop());
  }
  _show({ title, actions, timeout }) {
    this._isopen = true;
    this.addEventListener('animationend', this._listener.animationend);
    this._title.textContent = title;

    while (this._actions.childNodes.length) this._actions.removeChild(this._actions.childNodes[0]);
    for (let a of actions) {
      const b = document.createElement('button');
      b.classList.add('action-button');
      b.textContent = a.title;
      b.addEventListener(
        'click',
        e => {
          const ev = new CustomEvent('pmd.snackbar:actionClick', { detail: a });
          this.dispatchEvent(ev);
          this._deactive();
        },
        { once: true }
      );
      this._actions.appendChild(b);
    }

    setTimeout(() => this._deactive(), timeout);

    requestAnimationFrame(() => this.classList.add('active'));
  }
  _deactive() {
    if (this.isOpen()) requestAnimationFrame(() => this.classList.add('deactive'));
  }
  _animationend(e) {
    if (e.animationName === 'out') {
      this.removeEventListener('animationend', this._listener.animationend);

      this.classList.remove('active');
      this.classList.remove('deactive');

      this._isopen = false;

      setTimeout(() => this.show(), 100);
    }
  }
  static get _tmp() {
    return `
      <style>
        :host {
          display: flex;
          align-items: center;
          position: fixed;
          bottom: 16px;
          left: 16px;
          min-width: 344px;
          max-width: 600px;
          box-sizing: border-box;
          min-height: 48px;
          padding: 6px 24px;
          border-radius: 4px;
          background-color: #000000dd;
          font-size: 14px;
          color: #fff;
          z-index: 4000;
          transform: translateY(140%);
          box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
          user-select: none;
        }
        :host(.active) {
          animation: in 0.24s cubic-bezier(0.4, 0.6, 0.4, 0.9) forwards;
        }
        :host(.deactive) {
          animation: out 0.24s cubic-bezier(0.4, 0.6, 0.4, 0.9) forwards;
        }

        #title {
          flex: 1;
          margin-right: 24px;
          color: #ffffffde;
        }

        .action-button {
          min-width: 48px;
          height: 36px;
          margin: 0 2px;
          padding: 0;
          box-sizing: border-box;
          border: none;
          outline: none;
          background-color: transparent;
          text-align: center;
          font: 14px 'Roboto', 'Arial', sans-serif;
          color: #90a4ae;
          cursor: pointer;
        }

        @media (max-width: 599px) {
          :host {
            bottom: 0;
            right: 0;
            left: 0;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        }

        @keyframes in {
          0% {
            transform: translateY(150%);
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes out {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(150%);
          }
        }
      </style>
      <div id="title"></div>
      <div id="actions"></div>
    `;
  }
}

customElements.define('pmd-snackbar', snackbar);

export { snackbar };
