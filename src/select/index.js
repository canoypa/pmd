class select extends component {
    constructor(node) {
        super(node);

        this.selectChangeEvent = document.createEvent('HTMLEvents');
        this.selectChangeEvent.initEvent('change', true, true);

        this.items = this.root.querySelectorAll('option');

        this.selectedIndexValue = null;

        this.root.querySelector('select').addEventListener('change', e => {
            this.selectedIndex = e.currentTarget.selectedIndex;
        });
    }
    attach(node) { return new selector(node) }
    on(type, fn, op) { this.root.addEventListener(type, fn, op) }
    set selectedIndex(i) {
        if (this.selectedIndex !== i) {
            this.selectedIndexValue = i;

            this.root.dispatchEvent(this.selectChangeEvent);
        }
    }
    get selectedIndex() { return this.selectedIndexValue }
    get value() { return this.items[this.selectedIndex].value }
}

export { select }
