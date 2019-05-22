class dialog {
  constructor() {
    this._title = null;

    this.view = document.createElement('div');
    this._viewContent = {
      dialog: document.createElement('div'),
      header: document.createElement('header'),
      title: document.createElement('h5'),
      body: document.createElement('div'),
      footer: document.createElement('footer'),
      buttons: document.createElement('div')
    };

    const button1 = document.createElement('button');
    button1.classList.add('pmd-button');
    button1.classList.add('flat');
    button1.textContent = 'ACTION1';
    const button2 = document.createElement('button');
    button2.classList.add('pmd-button');
    button2.classList.add('flat');
    button2.textContent = 'ACTION2';
    this._viewContent.body.textContent =
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    this.view.classList.add('pmd-dialog');
    this._viewContent.dialog.classList.add('pmd-dialog-dialog');
    this._viewContent.header.classList.add('pmd-dialog-header');
    this._viewContent.title.classList.add('pmd-dialog-title');
    this._viewContent.title.textContent = this.title;
    this._viewContent.body.classList.add('pmd-dialog-body');
    this._viewContent.footer.classList.add('pmd-dialog-footer');
    this._viewContent.buttons.classList.add('pmd-dialog-buttons');

    this._viewContent.header.appendChild(this._viewContent.title);
    this._viewContent.dialog.appendChild(this._viewContent.header);
    this._viewContent.dialog.appendChild(this._viewContent.body);
    this._viewContent.buttons.appendChild(button1);
    this._viewContent.buttons.appendChild(button2);
    this._viewContent.footer.appendChild(this._viewContent.buttons);
    this._viewContent.dialog.appendChild(this._viewContent.footer);
    this.view.appendChild(this._viewContent.dialog);
  }
  getTitle() {
    return this._title;
  }
  setTitle(v) {
    this._title = v;
    this._viewContent.title.textContent = v;
    return this;
  }
  setRequired(b) {
    this._required = b ? true : false;
  }
  show() {
    document.body.appendChild(this.view);
    requestAnimationFrame(() => this.view.classList.add('active'));
  }
  create(opt) {
    const o = {
      title: 'title',
      cancelActionText: 'action',
      acceptActionText: 'action',
      cancelActionHandler: 'fn',
      acceptActionHandler: 'fn',
      content: {
        type: 'select | text',
        items: [{ text: 'text' }, { text: 'text' }]
      }
    };

    if (opt.title) {
      this.title.textContent = opt.title;
    }
  }
}

export { dialog };
