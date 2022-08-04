function onSubmit(event) {
  event.preventDefault();

  const w = parseFloat(event.target[0].value);
  const h = parseFloat(event.target[1].value);
  console.log(w, h);
  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    alert('적절한 값이 아닙니다. 1 이상의 숫자를 입력해 주세요.');
    return;
  }

  const bmi = w / (h * h);
  console.log(bmi.toFixed(2));
  // bmi 계산 로직
  const res = document.getElementById('res');
  document.getElementById('bmi').innerText = bmi.toFixed(2);
  res.style.display = 'block';

  const meter = document.getElementById('meter');
  meter.value = bmi;

  let state = '정상';
  let common = true;

  if (bmi < 18.5) {
    state = '저체중';
    common = false;
  }
  if (bmi >= 25) {
    state = '과체중';
    common = false;
  }
  if (bmi >= 40) {
    state = '비만';
    common = false;
  }

  const stateEl = document.getElementById('state');
  stateEl.innerText = state;
  stateEl.style.color = common ? '#26D69A' : '#8173EF';
}
