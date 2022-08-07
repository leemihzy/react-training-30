import { makeObservable, observable, action } from 'mobx';
import { v1 as uuidv1 } from 'uuid';

export class MemoModel {
  id = uuidv1();
  content = '';
  x = 0;
  y = 0;
  width = 250;
  height = 300;

  constructor() {
    // *observable : 변경될 시 알려주는 설정
    makeObservable(this, {
      content: observable,
      x: observable,
      y: observable,
      width: observable,
      height: observable,
    });
  }
}

export default class MemoStore {
  // id = 'memoStore';
  memos = [];

  constructor() {
    //* 함수 추가 후 action 정의 필요(브라우저 Mob Devtools에서 확인 가능)
    makeObservable(this, {
      memos: observable,
      // 변화를 주기 때문에 action 적용,
      addMemo: action,
      editMemo: action,
      setWidthHeight: action,
      setPosition: action,
      removeMemo: action,
    });
  }

  addMemo() {
    this.memos.push(new MemoModel());
  }

  editMemo(id, content) {
    this.memos[this.getMemoIndex(id)].content = content;
  }

  getMemoIndex(id) {
    return this.memos.findIndex((memo) => memo.id === id);
  }

  setWidthHeight(id, width, height) {
    const index = this.getMemoIndex(id);
    this.memos[index].width = width;
    this.memos[index].height = height;
  }

  setPosition(id, x, y) {
    const index = this.getMemoIndex(id);
    this.memos[index].x = x;
    this.memos[index].y = y;
  }

  removeMemo(id) {
    this.memos.splice(this.getMemoIndex(id), 1);
  }
}
