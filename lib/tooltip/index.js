class tooltip {
    constructor() {
        this.tooltip = document.querySelector('.pmd-tooltip');

        document.on('mouseover', '*[data-pmd-tooltip]', e => {
            const c = e.currentTarget_.getBoundingClientRect();
            this.tooltip.textContent = e.currentTarget_.getAttribute('data-pmd-tooltip');

            this.tooltip.style.top = ((c.top - (this.tooltip.getAttribute('aria-hidden') === true ? this.tooltip.offsetHeight / .9 : this.tooltip.offsetHeight) - 8 >= 8) ? (c.top - ((this.tooltip.getAttribute('aria-hidden') === true ? this.tooltip.offsetHeight / .9 : this.tooltip.offsetHeight) / .9) - 4) : (c.top + c.height + 4)) + 'px';
            this.tooltip.style.left = (((c.left + (c.width / 2)) - (this.tooltip.offsetWidth / 2) >= 8) ? (((c.left + (c.width / 2)) - (this.tooltip.offsetWidth / 2) <= document.body.offsetWidth - (this.tooltip.getAttribute('aria-hidden') === true ? this.tooltip.offsetWidth / .9 : this.tooltip.offsetWidth) - 8) ? ((c.left + (c.width / 2)) - (this.tooltip.offsetWidth / 2)) : (document.body.offsetWidth - (this.tooltip.getAttribute('aria-hidden') === true ? this.tooltip.offsetWidth / .9 : this.tooltip.offsetWidth) - 8)) : (8)) + 'px';

            this.tooltip.setAttribute('aria-hidden', false);
        });
        document.on('mouseout', '*[data-pmd-tooltip]', e => {
            this.tooltip.setAttribute('aria-hidden', true);
        });
    }
}

export { tooltip }
