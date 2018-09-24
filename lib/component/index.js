class component {
    constructor(node) {
        this.root = node;

        this.root.pmd = this.root.pmd || {};
    }
    addListener(t, f, o) { this.root.addEventListener(t, f, o) };
}

export { component };
