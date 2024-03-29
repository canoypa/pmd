import { component } from '../component/index.js';

class ripple extends component {
    constructor(node) {
        super(node);

        this.animationend = false;
        this.mouseup = false;
        this.mouseout = false;

        const ACTIVATION_EVENTS = ['mousedown', 'touchstart'];
        const DEACTIVATION_EVENTS = ['mouseup', 'touchend'];

        ACTIVATION_EVENTS.forEach(eve => {
            this.root.addEventListener(eve, e => this.rippleStart(e), { passive: true });
        });
        DEACTIVATION_EVENTS.forEach(eve => {
            this.root.addEventListener(eve, e => {
                this.mouseup = true;
                if (this.animationend === true && (this.mouseup === true || this.mouseout === true)) { this.rippleEnd() }
            }, { passive: true });
        });
        this.root.addEventListener('mouseout', e => {
            this.mouseout = true;
            if (this.animationend === true && (this.mouseup === true || this.mouseout === true)) { this.rippleEnd() }
        }, { passive: true });
        this.root.addEventListener('animationend', e => {
            if (e.animationName === 'pmd-ripple-in') {
                this.animationend = true;
                if (this.animationend === true && (this.mouseup === true || this.mouseout === true)) { this.rippleEnd() }
            }
            else if (e.animationName === 'pmd-ripple-out') {
                this.root.classList.remove('pmd-ripple--active');
                this.root.classList.remove('pmd-ripple--remove');
            }
        });
    }
    attach(node) { return new ripple(node) }
    rippleStart(e) {
        this.root.classList.remove('pmd-ripple--active');
        this.root.classList.remove('pmd-ripple--remove');

        this.animationend = false;
        this.mouseup = false;
        this.mouseout = false;

        const c = e.currentTarget.getBoundingClientRect();
        const rippleSize = Math.sqrt(Math.pow(c.width, 2) + Math.pow(c.height, 2));
        let offsetX, offsetY;
        if (e.currentTarget.classList.contains('pmd-ripple-unbounded')) {
            offsetX = (e.currentTarget.offsetWidth / 2);
            offsetY = (e.currentTarget.offsetWidth / 2);
        }
        else if (e.type === 'mousedown') {
            offsetX = e.offsetX;
            offsetY = e.offsetY;
        }
        else if (e.type === 'touchstart') {
            let touch = e.touches[0];
            let mouseX = touch.clientX;
            let mouseY = touch.clientY;
            offsetX = mouseX - c.left;
            offsetY = mouseY - c.top;
        }

        this.root.style.setProperty('--pmd-ripple-size', `${rippleSize}px`);
        this.root.style.setProperty('--pmd-ripple-start', `${offsetX - (rippleSize / 2)}px,${offsetY - (rippleSize / 2)}px`);
        this.root.style.setProperty('--pmd-ripple-end', `${this.root.offsetWidth / 2 - (rippleSize / 2)}px,${this.root.offsetHeight / 2 - (rippleSize / 2)}px`);

        this.root.classList.add('pmd-ripple--active');
    }
    rippleEnd(e) {
        this.animationend = false;
        this.mouseup = false;
        this.mouseout = false;

        this.root.classList.add('pmd-ripple--remove');
    }
}

export { ripple }
