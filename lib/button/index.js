import { component } from '../component/index.js';

class button extends component {
    constructor(node) {
        super(node);

        this.root.pmd.pmdButton = this;
    }
    fillColor(code) {
        this.root.style.setProperty('--data-pmd-button-color', code);
    }
}

export { button }
