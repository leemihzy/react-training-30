let left = null,
  right = null,
  oper = null,
  res = false, // = 눌렀을 경우
  resValue = null; // = 두번 눌렀을 경우 왼쪽으로 결과값이 가게 처리

function save() {
  const inp = document.getElementById('top-inp');
  let value = '';

  if (left === null) return;
  console.log('11', left);
  value += left + ' '; // ''는 띄어쓰기
  inp.value = value;

  if (oper === null) return;
  value += oper + ' ';
  inp.value = value;

  if (right === null) return;
  value += right + ' ';
  inp.value = value;

  if (res) {
    switch (oper) {
      case '+':
        resValue = parseInt(left) + parseInt(right);
        break;
      case '-':
        resValue = parseInt(left) - parseInt(right);
        break;
      case '*':
        resValue = parseInt(left) * parseInt(right);
        break;
      case '/':
        resValue = parseInt(left) / parseInt(right);
        break;
    }
    value += '= ' + resValue;
    inp.value = value;
  }
}

function inputNum(num) {
  if (oper === null) {
    // 연산이 다 끝나지않음
    if (left === null) {
      left = `${num}`; //num.toString(num);
    } else {
      if (num === 0 && parseInt(left) === 0) return;
      left += `${num}`;
    }
  } else {
    if (right === null) {
      right = `${num}`; //num.toString(num);
    } else {
      if (num === 0 && parseInt(right) === 0) return;
      right += `${num}`;
    }
  }
  save();
}

function inputOper(op) {
  if (left === null && op === '-') {
    // 왼쪽값이없는데 - 있을때면 음수이다
    left = '-';
    save();
    return;
  }
  if (left === '-' && op === '-') return; // - 가 연속으로 나올때 방지
  if (op === '-' && oper !== null) {
    // 연산자 정해지고 오른쪽값이 없을때
    right = '-';
    save();
    return;
  }

  oper = op;
  save();
}

function inputEqu() {
  if (left === null || !oper || right === null) return;

  if (res) {
    // 초기화
    left = resValue;
    right = null;
    resValue = null;
    oper = null;
    res = false;
  } else {
    res = true;
  }
  save();
}
