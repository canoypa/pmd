import { component } from '../component/index.js';
import { ripple } from '../ripple/index.js';

class chip extends component {
    constructor(node) {
        super(node);

        new ripple(node);
    }
}

export { chip };
