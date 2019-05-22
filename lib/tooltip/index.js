class Tooltip extends HTMLElement {
  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'closed' });
    this._shadow.innerHTML = Tooltip._tmp;

    this._bgElm = this._shadow.getElementById('bg');
    this._textElm = this._shadow.getElementById('text');
  }
  set text(v) {
    this._textElm.textContent = v;
  }

  static get _tmp() {
    return `
    <style>
      :host{
        display: flex;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        min-height: 24px;
        padding: 0 8px;
        transform-origin: center;
        z-index: 8000;
        pointer-events: none;
      }
      :host(.active){
        animation: move 0.2s 0.4s cubic-bezier(0.1, 0.12, 0.2, 0.84) forwards;
      }
      :host(.deactive){
        animation: out 0.1s 0.2s ease-out forwards;
      }
      
      #bg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 2px;
        opacity: 0;
        background-color: #616161;
        transition: transform .2s 0.5s, opacity .3s 0.5s;
      }
      :host(.active) #bg {
        animation: bg 0.2s 0.4s cubic-bezier(0.5, 1, 0.5, 1) forwards;
      }

      #text {
        color: #fff;
        font-size: 12px;
        opacity: 0;
        white-space: nowrap;
      }
      :host(.active) #text {
        animation: t 0.2s 0.48s forwards;
      }

      @media (max-width: 599px) {
        :host {
          padding: 0 16px;
          min-height: 32px;
        }
      }

      @keyframes move {
        0% {
          transform: translate(var(--start,0));
        }
        100% {
          transform: translate(0);
        }
      }
      @keyframes bg {
        0% {
          opacity: 0;
          transform: scale(0.2, 0.8);
        }
        100% {
          opacity: 0.9;
          transform: scale(1);
        }
      }
      @keyframes t {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      @keyframes out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    </style>
    <div id="bg"></div>
    <div id="text"></div>
    `;
  }
}

customElements.define('pmd-tooltip', Tooltip);

const tooltip = document.createElement('pmd-tooltip');

const pointerenter = e => {
  if (e.target.matches('[data-pmd-tooltip]')) {
    if (!document.getElementsByTagName('pmd-tooltip').length) document.body.appendChild(tooltip);
    tooltip.text = e.target.getAttribute('data-pmd-tooltip');

    const c = e.target.getBoundingClientRect();

    const rtop = c.top + c.height + 8;
    const rleft = c.left + (c.width - tooltip.offsetWidth) / 2;
    const maxheight = window.innerHeight - tooltip.offsetHeight - 8;
    const maxwidth = window.innerWidth - tooltip.offsetWidth - 8;
    const top = rtop < 8 ? 8 : rtop > maxheight ? c.top - tooltip.offsetHeight - 8 : rtop;
    const left = rleft < 8 ? 8 : rleft > maxwidth ? maxwidth : rleft;
    const start = `${c.left + c.width / 2 - tooltip.offsetWidth / 2 - left}px, ${c.top + c.height / 2 - tooltip.offsetHeight / 2 - top}px`;

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.style.setProperty('--start', start);

    document.body.addEventListener('pointerleave', listener.pointerleave, { capture: true, passive: true });

    requestAnimationFrame(() => tooltip.classList.add('active'));
  }
};

const pointerleave = e => {
  if (e.target.matches('[data-pmd-tooltip]')) {
    tooltip.classList.add('deactive');
    tooltip.addEventListener(
      'animationend',
      e => {
        tooltip.classList.remove('deactive');
        tooltip.classList.remove('active');
        document.body.removeChild(tooltip);
      },
      { once: true }
    );
    document.body.removeEventListener('pointerleave', listener.pointerout, { capture: true, passive: true });
  }
};

const listener = {
  pointerenter: e => pointerenter(e),
  pointerleave: e => pointerleave(e)
};

document.body.addEventListener('pointerenter', listener.pointerenter, { capture: true, passive: true });
