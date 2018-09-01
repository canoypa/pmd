class ripple extends component {
    constructor(node) {
        super(node);

        for (let et of ACTIVATION_EVENTS) {
            node.addEventListener(et, this.mouseDown, { passive: true });
        }

        for (let et of DEACTIVATION_EVENTS) {
            node.addEventListener(et, this.mouseUp, { passive: true });
        }
    }
    attach(node) { return new ripple(node) }
    mouseDown(e) {
        const testdiv = document.createElement('div');
        testdiv.style.position = 'absolute';
        testdiv.style.top = e.offsetY + 'px';
        testdiv.style.left = e.offsetX + 'px';
        testdiv.style.width = '1px';
        testdiv.style.height = '1px';
        testdiv.style.backgroundColor = '#f00';
        // this.appendChild(testdiv);

        const rippleSize = (this.offsetWidth > this.offsetHeight ? this.offsetWidth : this.offsetHeight) * 1.4;

        this.style.setProperty('--pmd-ripple-size', `${rippleSize}px`);
        this.style.setProperty('--pmd-ripple-start', `${e.offsetX - (rippleSize / 2)}px,${e.offsetY - (rippleSize / 2)}px`);
        this.style.setProperty('--pmd-ripple-end', `${this.offsetWidth / 2 - (rippleSize / 2)}px,${this.offsetHeight / 2 - (rippleSize / 2)}px`);
        this.classList.add('pmd-ripple-active');
    }
    mouseUp(e) {
        this.classList.remove('pmd-ripple-active');
    }
}

export { ripple }
