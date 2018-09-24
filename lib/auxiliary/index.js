function createElement(tag, cmps) {
    const root = document.createElement(tag);

    if (typeof cmps === 'object') {
        for (let cmp of cmps) {
            new this[cmps](root);
        }
    }
    else {
        new this[cmps](root);
    }

    return root;
}

function querySelector(selector) {
    const root = document.querySelector(selector);

    return root ? root.pmd ? root.pmd : null : null;
}

export { createElement, querySelector }
