const registry = {};

function autoInit() {
    const nodes = document.querySelectorAll('[data-pmd-auto-init]');

    for (let i = 0, node; (node = nodes[i]); i++) {
        const ctorName = node.dataset.pmdAutoInit;
        if (!ctorName) { throw new Error('[pmd-auto-init] Constructor name must be given.') }

        const n = new registry[ctorName](node);
    }
}
autoInit.register = function (componentName, ctor) {
    if (typeof ctor !== 'function') {
        throw new Error(`[pmd-auto-init] ${Ctor} is not a function.`);
    }
    registry[componentName] = ctor;
}

export { autoInit }
