import { component } from '../component/index.js';

class tab extends component {
    constructor(node) {
        super(node);

        this.root.pmd.tab = this;

        this.selectedIndexValue;

        this.scrollLeft = 0;

        this.selectChangeEvent = document.createEvent('HTMLEvents');
        this.selectChangeEvent.initEvent('change', true, true);

        this.items = this.root.querySelectorAll('.pmd-tab-item');
        this.scroller = this.root.querySelector('.pmd-tab-scroller');

        window.addEventListener('resize', e => this.update(), { passive: true });

        this.scroller.addEventListener('animationend', e => {
            const selectedtab = this.items[this.selectedIndexValue];

            if (e.animationName === 'pmd-tab-scroll') {
                requestAnimationFrame(() => {
                    this.scroller.style.animation = null;
                    this.root.scrollLeft = selectedtab.offsetLeft + selectedtab.offsetWidth / 2 - this.scroller.offsetWidth / 2;
                });
            }
        });

        this.init();
    }
    init() {
        const par = [].slice.call(this.items);
        const selectTab = this.root.querySelector('.pmd-tab-item[aria-selected="true"]') || this.root.querySelector('.pmd-tab-item');
        const index = par.indexOf(selectTab);
        this.setSelectedIndex(index);

        for (let ei of this.root.querySelectorAll('.pmd-tab-item')) {
            ei.addEventListener('click', e => {
                const par = [].slice.call(this.items);
                const index = par.indexOf(e.currentTarget);
                this.setSelectedIndex(index);
            }, { passive: true });
        }
    }
    update() {
        this.root.style.setProperty('--tab-Indicator-width', `${this.items[this.selectedIndexValue].clientWidth}px`);
        this.root.style.setProperty('--tab-Indicator-left', `${this.items[this.selectedIndexValue].offsetLeft}px`);
        this.root.style.setProperty('--tab-Indicator-right', `${this.root.offsetWidth - (this.items[this.selectedIndexValue].offsetLeft + this.items[this.selectedIndexValue].offsetWidth)}px`);

        const selectedtab = this.items[this.selectedIndexValue];
        this.scrollLeft = ((selectedtab.offsetLeft + selectedtab.offsetWidth / 2 - this.scroller.offsetWidth / 2) > 0 ?
            (selectedtab.offsetLeft + selectedtab.offsetWidth / 2 - this.scroller.offsetWidth / 2) < this.scroller.offsetWidth ?
                (selectedtab.offsetLeft + selectedtab.offsetWidth / 2 - this.scroller.offsetWidth / 2) :
                (this.scroller.scrollWidth - this.scroller.clientWidth) :
            0);

        this.root.style.setProperty('--pmd-tab-scroll-end', `${-(this.scrollLeft) + this.root.scrollLeft}px`);
        requestAnimationFrame(() => {
            this.scroller.style.animation = 'pmd-tab-scroll .3s ease-out forwards';
        });
    }
    setSelectedIndex(i) {
        if (this.selectedIndexValue !== i) {
            this.selectedIndexValue = i;
            for (let e of this.root.querySelectorAll('.pmd-tab-item[aria-selected="true"]')) {
                e.setAttribute('aria-selected', false);
            }
            this.items[i].setAttribute('aria-selected', true);

            this.update();

            this.root.dispatchEvent(this.selectChangeEvent);
        }
    }
    getSelectedIndex() { return this.selectedIndexValue }
    getSelectedValue() { return this.items[this.selectedIndexValue].textContent }
    setSelectedValue(v) { this.items[this.selectedIndexValue].setAttribute('data-pmd-tab-value', v); this.items[this.selectedIndexValue].textContent = v }
    setIndicatorColor(code) { this.root.querySelector('.pmd-tab-Indicator').backgroundColor = code }
}

export { tab }
