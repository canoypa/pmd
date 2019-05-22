class checkbox {
  constructor(node) {
    this.changeListener = e => this.change(e);
    this.activedEndListener = e => this.activedEnd(e);
    this.deactivedStartListener = e => this.deactivedStart(e);
    this.deactivedEndListener = e => this.deactivedEnd(e);

    this.root = node;
    this.input = this.root.querySelector('input');
    this.back = this.root.querySelector('.pmd-checkbox-background');
    this.mark = this.root.querySelector('.pmd-checkbox-checkmark');

    this.input.addEventListener('change', this.changeListener);
  }
  change() {
    if (this.input.checked === true) this.root.classList.add('checked');
    else this.root.classList.remove('checked');
  }
}

export { checkbox };
