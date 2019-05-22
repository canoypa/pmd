class datePicker {
  constructor() {
    this._weekText = ['日', '月', '火', '水', '木', '金', '土'];

    this._select = new Date();
    this._viewYear = this._select.getFullYear();
    this._viewMonth = this._select.getMonth();

    this._listener = {
      prevMonth: e => this.prevMonth(e),
      nextMonth: e => this.nextMonth(e)
    }

    this._view = document.createElement('div');
    this._viewContent = {
      header: document.createElement('header'),
      year: document.createElement('div'),
      day: document.createElement('h4'),
      body: document.createElement('div'),
      monthdiv: document.createElement('div'),
      month: document.createElement('div'),
      prev: document.createElement('button'),
      prevArrow: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
      prevArrowPath: document.createElementNS("http://www.w3.org/2000/svg", "path"),
      next: document.createElement('button'),
      nextArrow: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
      nextArrowPath: document.createElementNS("http://www.w3.org/2000/svg", "path"),
      table: document.createElement('div'),
      weekConteiner: document.createElement('div'),
      dateConteiner: document.createElement('div'),
      footer: document.createElement('footer'),
      button1: document.createElement('button'),
      button2: document.createElement('button')
    };

    this._view.classList.add('pmd-date-picker');
    this._viewContent.body.classList.add('main');
    this._viewContent.monthdiv.classList.add('monthdiv');
    this._viewContent.prev.classList.add('prev');
    this._viewContent.prev.classList.add('pmd-button');
    this._viewContent.prev.classList.add('icon');
    this._viewContent.next.classList.add('next');
    this._viewContent.next.classList.add('pmd-button');
    this._viewContent.next.classList.add('icon');
    this._viewContent.month.classList.add('date');
    this._viewContent.table.classList.add('table');
    this._viewContent.weekConteiner.classList.add('table-row');
    this._viewContent.dateConteiner.classList.add('table-rowgroup');
    this._viewContent.button1.classList.add('pmd-button');
    this._viewContent.button1.classList.add('flat');
    this._viewContent.button2.classList.add('pmd-button');
    this._viewContent.button2.classList.add('flat');


    this._viewContent.prevArrow.setAttribute('viewBox', '0 0 24 24');
    this._viewContent.prevArrowPath.setAttribute('d', 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z');
    this._viewContent.nextArrow.setAttribute('viewBox', '0 0 24 24');
    this._viewContent.nextArrowPath.setAttribute('d', 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z');
    this._viewContent.button1.textContent = 'キャンセル';
    this._viewContent.button2.textContent = 'OK';

    for (let i = 0; i < 7; i++) {
      const w = document.createElement('div');
      w.classList.add('cell');
      w.textContent = this._weekText[i];
      this._viewContent.weekConteiner.appendChild(w);
    }

    this._viewContent.header.appendChild(this._viewContent.year);
    this._viewContent.header.appendChild(this._viewContent.day);
    this._view.appendChild(this._viewContent.header);
    this._viewContent.prevArrow.appendChild(this._viewContent.prevArrowPath)
    this._viewContent.nextArrow.appendChild(this._viewContent.nextArrowPath)
    this._viewContent.prev.appendChild(this._viewContent.prevArrow)
    this._viewContent.next.appendChild(this._viewContent.nextArrow)
    this._viewContent.monthdiv.appendChild(this._viewContent.prev);
    this._viewContent.monthdiv.appendChild(this._viewContent.month);
    this._viewContent.monthdiv.appendChild(this._viewContent.next);
    this._viewContent.body.appendChild(this._viewContent.monthdiv);
    this._viewContent.table.appendChild(this._viewContent.weekConteiner);
    this._viewContent.table.appendChild(this._viewContent.dateConteiner);
    this._viewContent.body.appendChild(this._viewContent.table);
    this._view.appendChild(this._viewContent.body);
    this._viewContent.footer.appendChild(this._viewContent.button1);
    this._viewContent.footer.appendChild(this._viewContent.button2);
    this._view.appendChild(this._viewContent.footer);

    this._viewContent.prev.addEventListener('click', this._listener.prevMonth);
    this._viewContent.next.addEventListener('click', this._listener.nextMonth);

    this.redrow();

    console.log(this);
  }

  get select() {
    const s = this._select;
    return {
      year: s.getFullYear(),
      month: s.getMonth() + 1,
      date: s.getDate(),
      day: this._weekText[s.getDay()],
    }
  }

  prevMonth() {
    this.setDate(this._viewYear, this._viewMonth - 1);
  }
  nextMonth() {
    this.setDate(this._viewYear, this._viewMonth + 1);
  }

  setDate(y, m) {
    if (m > 11) { y++; m = 0; }
    else if (m < 0) { y--; m = 11; }

    this._viewYear = y;
    this._viewMonth = m;

    this.redrow();
  }

  redrow() {
    this._viewContent.year.textContent = this.select.year;
    this._viewContent.day.textContent = `${this.select.month}月${this.select.date}日(${this.select.day})`;

    this._viewContent.month.textContent = `${this._viewYear}年${1 + this._viewMonth}月`;


    const dateConteiner = this._viewContent.dateConteiner;
    while (dateConteiner.childNodes.length) dateConteiner.removeChild(dateConteiner.childNodes[0]);

    const firstDay = new Date(this._viewYear, this._viewMonth, 1)
    const dateLength = new Date(this._viewYear, this._viewMonth + 1, 0).getDate()
    const df = document.createDocumentFragment();

    let day = 1;
    for (let w = 0; w < 6; w++) {
      const wdf = document.createElement('div');
      wdf.classList.add('table-row');
      for (let d = 0; d < 7; d++) {
        const e = document.createElement('div');
        e.classList.add('cell');

        if (!(w === 0 && (d < firstDay.getDay()) || day > dateLength)) {
          const ed = document.createElement('div');
          ed.classList.add('ed');
          e.appendChild(ed);
          ed.textContent = day;
          day++
        }
        wdf.appendChild(e);
      }
      df.appendChild(wdf);
    }

    dateConteiner.appendChild(df);
  }
  show() {
    document.body.appendChild(this._view);
  }
}

export { datePicker };
