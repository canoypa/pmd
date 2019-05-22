import { component } from '../component/index.js';

class snackbar extends component {
  constructor(node) {
    super(node);

    this.stack = [];

    this.processing = false;
    this.timeoutValue = true;
    this.lowestTimeoutValue = true;

    this.timeout = null;
    this.lowestTimeout = null;

    this.text = this.root.querySelector('.pmd-snackbar-text');
    this.actionButton = this.root.querySelector('.pmd-snackbar-action-button');

    this.snackEndEventHandler = e => this.remove();
    this.outAnimationEndEventHandler = e => this.outanimationend(e);
  }
  show(set) {
    if (!set.message) {
      throw new Error('missing values');
    }
    const s = { message: set.message, actionText: set.actionText, actionHandler: set.actionHandler || null, timeout: set.timeout || 2500, lowestTimeout: set.lowestTimeout || 500 };
    if (s.timeout === s.lowestTimeout) {
      s.lowestTimeout = null;
    }
    this.stack.push(s);

    this.putRequest();
  }
  putRequest() {
    console.log('request');
    console.log(this.getTimeout(), this.getLowestTimeout(), this.getHavWaitingSnack());

    if (!this.getGetProcessing() && (this.getTimeout() || this.getLowestTimeout()) && this.getHavWaitingSnack()) {
      this.put();
    } else if ((this.getTimeout() || this.getLowestTimeout()) && this.getHavWaitingSnack()) {
      this.remove();
    }
  }
  put() {
    this.setGetProcessing(true);
    this.setTimeout(false);
    this.setLowestTimeout(false);

    const s = this.stack.shift();

    this.text.textContent = s.message;
    this.actionButton.textContent = s.actionText;
    this.actionButton.addEventListener('click', this.snackEndEventHandler);

    this.timeout = setTimeout(() => {
      this.setTimeout(true);
      this.remove();
    }, s.timeout);

    if (s.lowestTimeout) {
      this.lowestTimeout = setTimeout(() => {
        this.setLowestTimeout(true);
        if (this.getHavWaitingSnack()) {
          this.remove();
        }
      }, s.lowestTimeout);
    }

    requestAnimationFrame(() => {
      this.root.classList.add('pmd-snackbar-active');
    });
  }
  remove() {
    clearTimeout(this.timeout);
    clearTimeout(this.lowestTimeout);

    this.actionButton.removeEventListener('click', this.snackEndEventHandler);
    this.root.addEventListener('animationend', this.outAnimationEndEventHandler, { once: true });

    requestAnimationFrame(() => {
      this.root.classList.add('pmd-snackbar-deactive');
    });
  }
  outanimationend(e) {
    if (e.animationName === 'pmd-snackbar-out') {
      this.root.classList.remove('pmd-snackbar-deactive');
      this.root.classList.remove('pmd-snackbar-active');
      this.text.textContent = null;
      this.actionButton.textContent = null;
      this.setGetProcessing(false);
      this.setTimeout(true);
      this.setLowestTimeout(true);

      this.putRequest();
    }
  }
  getGetProcessing() {
    return this.processing;
  }
  setGetProcessing(v) {
    this.processing = v ? true : false;
  }
  getTimeout() {
    return this.timeoutValue;
  }
  setTimeout(v) {
    this.timeoutValue = v ? true : false;
  }
  getLowestTimeout() {
    return this.lowestTimeoutValue;
  }
  setLowestTimeout(v) {
    this.lowestTimeoutValue = v ? true : false;
  }
  getHavWaitingSnack() {
    return this.stack.length ? true : false;
  }
}

export { snackbar };
