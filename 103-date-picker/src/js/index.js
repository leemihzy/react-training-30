class DatePicker {
  monthData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  #calendarDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  selectedDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  datePickerEl;
  dateInputEl;
  calendarEl;
  calendarMonthEl;
  monthContentEl;
  nextBtnEl;
  prevBtnEl;
  calendarDatesEl;

  constructor() {
    this.initCalendarDate();
    this.initSelectedDate();
    this.assignElement();
    this.setDateInput();
    this.addEvent();
  }

  initSelectedDate() {
    this.selectedDate = { ...this.#calendarDate };
    console.log(this.selectedDate);
  }

  setDateInput() {
    this.dateInputEl.textContent = this.formatDate(this.selectedDate.data);
    this.dateInputEl.dataset.value = this.selectedDate.data;
  }

  initCalendarDate() {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();
    this.#calendarDate = {
      data,
      date,
      month,
      year,
    };
  }

  assignElement() {
    this.datePickerEl = document.getElementById('date-picker');
    this.dateInputEl = this.datePickerEl.querySelector('#date-input');
    this.calendarEl = this.datePickerEl.querySelector('#calendar');
    this.calendarMonthEl = this.datePickerEl.querySelector('#month');
    this.monthContentEl = this.calendarMonthEl.querySelector('#content');
    this.nextBtnEl = this.calendarMonthEl.querySelector('#next');
    this.prevBtnEl = this.calendarMonthEl.querySelector('#prev');
    this.calendarDatesEl = this.calendarEl.querySelector('#dates');
  }

  addEvent() {
    this.dateInputEl.addEventListener('click', this.toggleCalendar.bind(this));
    this.nextBtnEl.addEventListener('click', this.moveToNextMonth.bind(this));
    this.prevBtnEl.addEventListener('click', this.moveToPrevMonth.bind(this));
    this.calendarDatesEl.addEventListener(
      'click',
      this.onClickSelectDate.bind(this),
    );
  }

  onClickSelectDate(event) {
    const eventTarget = event.target;
    if (eventTarget.dataset.date) {
      this.calendarDatesEl
        .querySelector('.selected')
        ?.classList.remove('selected');
      eventTarget.classList.add('selected');
      this.selectedDate = {
        data: new Date(
          this.#calendarDate.year,
          this.#calendarDate.month,
          eventTarget.dataset.date,
        ),
        date: eventTarget.dataset.date,
        month: this.#calendarDate.month,
        year: this.#calendarDate.year,
      };
      this.setDateInput();
      this.calendarEl.classList.remove('active');
      console.log(this.dateInputEl.textContent);
    }
  }

  formatDate(dateData) {
    let date = dateData.getDate();
    if (date < 10) {
      date = `0${date}`;
    }
    let month = dateData.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let year = dateData.getFullYear();
    return `${year}/${month}/${date}`;
  }

  moveToNextMonth() {
    this.#calendarDate.month++;
    if (this.#calendarDate.month > 11) {
      this.#calendarDate.month = 0;
      this.#calendarDate.year++;
    }
    this.updateMonth();
    this.updateDates();
  }
  moveToPrevMonth() {
    this.#calendarDate.month--;
    if (this.#calendarDate.month < 0) {
      this.#calendarDate.month = 11;
      this.#calendarDate.year--;
    }
    this.updateMonth();
    this.updateDates();
  }

  toggleCalendar() {
    if (this.calendarEl.classList.contains('active')) {
      this.#calendarDate = { ...this.selectedDate };
    }
    this.calendarEl.classList.toggle('active');
    this.updateMonth();
    this.updateDates();
    // *day: 요일 dates: 날짜
  }

  updateMonth() {
    this.monthContentEl.textContent = `${this.#calendarDate.year} / ${
      this.monthData[this.#calendarDate.month]
    }`;
  }

  updateDates() {
    this.calendarDatesEl.innerHTML = '';
    // 해당 월에 날짜가 며칠이 들어가는지 요하는 함수
    const numberOfDates = new Date(
      this.#calendarDate.year,
      this.#calendarDate.month + 1,
      0,
    ).getDate();

    const fragment = new DocumentFragment();
    for (let i = 0; i < numberOfDates; i++) {
      const dateEl = document.createElement('div');
      dateEl.classList.add('date');
      dateEl.textContent = i + 1;
      dateEl.dataset.date = i + 1;
      fragment.appendChild(dateEl);
    }
    fragment.firstChild.style.gridColumnStart =
      new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay() +
      1; // 1일의 시작요일 위치, .getDay()는 일~토를 0~6으로 출력시킴
    this.calendarDatesEl.appendChild(fragment);
    this.colorSaturday();
    this.colorSunday();
    this.markToday();
    this.markSelectedDate();
  }

  markSelectedDate() {
    if (
      this.selectedDate.year === this.#calendarDate.year &&
      this.selectedDate.month === this.#calendarDate.month
    ) {
      this.calendarDatesEl
        .querySelector(`[data-date='${this.selectedDate.date}']`)
        .classList.add('selected');
    }
  }

  colorSaturday() {
    const saturdayEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        7 -
        new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay()
      })`,
    );
    for (let i = 0; i < saturdayEls.length; i++) {
      saturdayEls[i].style.color = 'blue';
    }
  }
  colorSunday() {
    const sundayEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        (8 -
          new Date(
            this.#calendarDate.year,
            this.#calendarDate.month,
            1,
          ).getDay()) %
        7
      })`,
    );
    for (let i = 0; i < sundayEls.length; i++) {
      sundayEls[i].style.color = 'red';
    }
  }

  markToday() {
    const currentDay = new Date();
    const currentMonth = currentDay.getMonth();
    const currentYear = currentDay.getFullYear();
    const today = currentDay.getDate();
    if (
      currentYear === this.#calendarDate.year &&
      currentMonth === this.#calendarDate.month
    ) {
      this.calendarDatesEl
        .querySelector(`[data-date='${today}']`)
        ?.classList.add('today');
    }
  }
}

new DatePicker();
