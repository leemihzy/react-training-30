export class Keyboard {
  // *privite method면 #을 붙인다
  #switchEl; // private class field 이 클래스는 프라이빗 처리됨
  #fontSelectEl; // private class field 이 클래스는 프라이빗 처리됨
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById('container');
    this.#switchEl = this.#containerEl.querySelector('#switch');
    this.#fontSelectEl = this.#containerEl.querySelector('#font');
    this.#keyboardEl = this.#containerEl.querySelector('#keyboard');
    this.#inputGroupEl = this.#containerEl.querySelector('#input-group');
    this.#inputEl = this.#inputGroupEl.querySelector('#input');
  }

  #addEvent() {
    this.#switchEl.addEventListener('change', this.#onChangeTheme);
    this.#fontSelectEl.addEventListener('change', this.#onChangeFont);
    // bind: this가 전역객체를 바라보는 것 방지,  class의 this를 바라보게
    document.addEventListener('keydown', this.#onKeyDown.bind(this));
    // bind: this가 전역객체를 바라보는 것 방지,  class의 this를 바라보게
    document.addEventListener('keyup', this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener('input', this.#onInput);
    this.#keyboardEl.addEventListener(
      'mousedown',
      this.#onMouseDown.bind(this) // this를 사용할 경우 bind 처리ㄴ
    );
    document.addEventListener('mouseup', this.#onMouseUp.bind(this));
  }

  #onMouseUp(event) {
    const keyEl = event.target.closest('div.key');
    // !undefined -> true , !!undefined -> false 확실한 타입캐스팅
    const isActive = !!keyEl?.classList.contains('active');
    const val = keyEl?.dataset.val; // data-val을 dataset으로 불러올 수 있음
    if (isActive && !!val && val !== 'Space' && val !== 'Backspace') {
      this.#inputEl.value += val;
    }
    if (isActive && val === 'Space') {
      this.#inputEl.value += ' ';
    }
    if (isActive && val === 'Backspace') {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector('.active')?.classList.remove('active');
  }

  #onMouseDown(event) {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    event.target.closest('div.key')?.classList.add('active');
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      'theme',
      event.target.checked ? 'dark-mode' : ''
    );
  }

  #onChangeFont(event) {
    console.log(event.target.value);
    document.body.style.fontFamily = event.target.value;
  }

  #onInput(event) {
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, '');
  }

  #onKeyDown(event) {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    console.log(event.code);
    this.#inputEl.focus();
    this.#inputGroupEl.classList.toggle(
      'error',
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key)
    );

    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add('active');
  }

  #onKeyUp(event) {
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.remove('active');
  }
}
