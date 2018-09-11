import { component } from "../component/index.js";

class tab extends component {
    constructor(node) {
        super(node);

        this.selectedIndexValue = null;

        this.selectChangeEvent = document.createEvent('HTMLEvents');
        this.selectChangeEvent.initEvent('change', true, true);

        this.items = this.root.querySelectorAll('.pmd-tab-item');

        window.addEventListener('resize', this.resize, { passive: true });
        this.init();
    }
    attach(node) { return new tab(node) }
    init() {
        const par = [].slice.call(this.items);
        const selectTab = this.root.querySelector('.pmd-tab-item[aria-selected="true"]') ? this.root.querySelector('.pmd-tab-item[aria-selected="true"]') : this.root.querySelector('.pmd-tab-item');
        const index = par.indexOf(selectTab);
        this.selectedIndex = index;

        for (let ei of this.root.querySelectorAll('.pmd-tab-item')) {
            ei.addEventListener('click', e => {
                const par = [].slice.call(this.items);
                const index = par.indexOf(e.currentTarget);
                this.selectedIndex = index;
            }, { passive: true });
        }
    }
    set selectedIndex(i) {
        if (this.selectedIndex !== i) {
            this.selectedIndexValue = i;
            for (let e of this.root.querySelectorAll('.pmd-tab-item[aria-selected="true"]')) {
                e.setAttribute('aria-selected', false);
            }
            this.items[i].setAttribute('aria-selected', true);

            const tabs = this.root.querySelector('.pmd-tab-scroller');
            const scroll = this.items[i].offsetLeft + this.items[i].offsetWidth / 2 - tabs.offsetWidth / 2;
            tabs.scrollLeft = scroll;

            this.root.style.setProperty('--tab-Indicator-width', `${this.items[i].clientWidth}px`);
            this.root.style.setProperty('--tab-Indicator-left', `${this.items[i].offsetLeft}px`);
            this.root.style.setProperty('--tab-Indicator-right', `${this.root.offsetWidth - (this.items[i].offsetLeft + this.items[i].offsetWidth)}px`);

            this.root.dispatchEvent(this.selectChangeEvent);
        }
    }
    get selectedIndex() { return this.selectedIndexValue }
    get value() { return 0 }
    set indicatorColor(code) { this.root.querySelector('.pmd-tab-Indicator').backgroundColor = code }
    on(type, fn, op) { this.root.addEventListener(type, fn, op) }
    resize() { }
}

export { tab }
