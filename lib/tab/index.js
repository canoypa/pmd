import { component } from '../component/index.js';

class tab_ extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.innerHTML = tab_._tmp;
  }
  static get _tmp() {
    return `
    <div id="scroller">
      <slot name="tab"></slot>
      <div id="indicator"></div>
    </div>
    <style>
      :host {
        display: flex;
        width: 100%;
        overflow-x: scroll;
      }
      :host::-webkit-scrollbar {
        display: none;
      }

      #scroller {
        position: relative;
        display: flex;
        transition: transform 0.25s cubic-bezier(0.2, 0.2, 0.1, 0.9);
      }
      #scroller.scrolling {
        transform: translateX(var(--pmd-tab-scroll-end));
      }

      ::slotted([slot=tab]) {
        position: relative;
        display: flex;
        flex: 1 0 auto;
        justify-content: center;
        box-sizing: content-box;
        height: 48px;
        min-width: 200px;
        max-width: 360px;
        padding: 0 20px;
        border: none;
        background-color: #fff;
        font-size: 14px;
        text-align: center;
        white-space: nowrap;
        outline: none;
        cursor: pointer;
        transition: color 0.1s ease-out;
      }
      ::slotted([slot=tab])::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      ::slotted([slot=tab]:hover)::before,
      ::slotted([slot=tab]:focus)::before {
        background: rgba(0, 0, 0, 0.03);
      }
      ::slotted([slot=tab]).selected {
        color: var(--pmd-tab-selected-color, rgba(0, 0, 0, 0.5));
      }
      #indicator {
        position: absolute;
        bottom: 0;
        height: 2px;
        width: var(--pmd-tab-indicator-width);
        background-color: #2196f3;
        transition: transform 0.25s ease-out;
        pointer-events: none;
      }
      #indicator.active {
        transform: translateX(var(--pmd-tab-indicator-end, 0));
      }
      @media (max-width: 599px) {
        ::slotted([slot=tab]) {
          min-width: 80px;
        }
      }

      @keyframes pmd-tab-scroll {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(var(--pmd-tab-scroll-end, 0));
        }
      }
    </style>
    `;
  }
}
customElements.define('pmd-tab', tab_);

class tab extends component {
  constructor(node) {
    super(node);

    this.selectedIndexValue;

    this.scrollLeft = 0;

    this.selectChangeEvent = document.createEvent('HTMLEvents');
    this.selectChangeEvent.initEvent('change', true, true);

    this.items = this.root.querySelectorAll('.pmd-tab-item');
    this.scroller = this.root.querySelector('.pmd-tab-scroller');
    this.indicator = this.root.querySelector('.pmd-tab-indicator');

    this.windowResizeEventListener = e => this.update();
    this.transitionendEventListener = e => this.transitionendHandler(e);
    this.selectTabEventListener = e => this.selectTabHandler(e);
    this.scrollEventListener = e => this.scrollHandler(e);

    this.root.querySelectorAll('.pmd-tab-item').forEach(el => {
      el.addEventListener('click', this.selectTabEventListener, { passive: true });
    });
    this.root.addEventListener('scroll', this.scrollEventListener, { passive: true });
    window.addEventListener('resize', this.windowResizeEventListener, { passive: true });

    this.init();
  }
  init() {
    const par = [].slice.call(this.items);
    const selectTab = this.root.querySelector('.pmd-tab-item[data-pmd-tab-selected="true"]') || this.root.querySelector('.pmd-tab-item');
    const index = par.indexOf(selectTab);
    this.setSelectedIndex(index);
  }
  scrollHandler(e) {
    const selectedtab = this.items[this.selectedIndexValue];

    this.scroller.classList.remove('pmd-tab-scrolling');
    selectedtab.offsetLeft + selectedtab.offsetWidth / 2 - this.scroller.offsetWidth / 2;
  }
  transitionendHandler(e) {
    if (e.propertyName === 'transform') {
      requestAnimationFrame(() => {});
    }
  }
  update() {
    this.root.style.setProperty('--pmd-tab-indicator-width', `${this.items[this.selectedIndexValue].clientWidth}px`);
    // this.root.style.setProperty('--pmd-tab-indicator-left', `${this.items[this.selectedIndexValue].offsetLeft}px`);
    // this.root.style.setProperty('--pmd-tab-indicator-right', `${this.root.offsetWidth - (this.items[this.selectedIndexValue].offsetLeft + this.items[this.selectedIndexValue].offsetWidth)}px`);
    this.root.style.setProperty('--pmd-tab-indicator-end', `${this.items[this.selectedIndexValue].offsetLeft}px`);

    const selectedtab = this.items[this.selectedIndexValue];
    const maxscroll = this.scroller.scrollWidth - this.scroller.clientWidth;
    this.scrollLeft =
      this.scroller.scrollWidth - this.scroller.clientWidth > 0
        ? selectedtab.offsetLeft + selectedtab.offsetWidth / 2 - this.scroller.offsetWidth / 2 > 0
          ? selectedtab.offsetLeft + selectedtab.offsetWidth / 2 - this.scroller.offsetWidth / 2 < maxscroll
            ? selectedtab.offsetLeft + selectedtab.offsetWidth / 2 - this.scroller.offsetWidth / 2
            : maxscroll
          : 0
        : 0;

    let scrollStartPos = 0;
    const scrollEndPos = -this.scrollLeft + this.root.scrollLeft;
    this.root.style.setProperty('--pmd-tab-scroll-end', `${scrollEndPos}px`);
    this.scroller.addEventListener('transitionend', this.transitionendEventListener);
    requestAnimationFrame(() => {
      // this.scroller.style.animation = 'pmd-tab-scroll .3s ease-out forwards';
      this.indicator.classList.add('pmd-indicator-active');
      this.scroller.classList.add('pmd-tab-scrolling');
    });
  }
  selectTabHandler(e) {
    const par = [].slice.call(this.items);
    const index = par.indexOf(e.currentTarget);
    this.setSelectedIndex(index);
  }
  setSelectedIndex(i) {
    if (this.selectedIndexValue !== i) {
      this.selectedIndexValue = i;
      for (let e of this.root.querySelectorAll('.pmd-tab-item[data-pmd-tab-selected="true"]')) {
        e.setAttribute('data-pmd-tab-selected', false);
      }
      this.items[i].setAttribute('data-pmd-tab-selected', true);

      this.update();

      this.root.dispatchEvent(this.selectChangeEvent);
    }
  }
  getSelectedIndex() {
    return this.selectedIndexValue;
  }
  getSelectedValue() {
    return this.items[this.selectedIndexValue].textContent;
  }
  setSelectedValue(v) {
    this.items[this.selectedIndexValue].setAttribute('data-pmd-tab-value', v);
    this.items[this.selectedIndexValue].textContent = v;
  }
  setIndicatorColor(code) {
    this.root.querySelector('.pmd-tab-Indicator').backgroundColor = code;
  }
}

export { tab };
