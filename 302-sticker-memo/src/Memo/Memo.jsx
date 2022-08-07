import React from 'react';
import Draggable from '@leemihzy/draggable';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import './Memo.scss';
import {
  useRef,
  useMemo,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import { debounce } from 'underscore';
import { observer } from 'mobx-react';

function Memo({ item, Delete, Edit, SetPosition, SetWidthHeight }) {
  console.log(item);
  const handleRef = useRef(null);
  const memoContainer = useRef(null);
  const onChangeMemo = useMemo(
    () => debounce((e) => Edit(item.id, e.target.value), 500),
    [item.id, Edit]
  );
  // *entry 옵저버 여러개
  const onChangeSize = useMemo(
    () =>
      debounce((entry) => {
        const { width, height } = entry[0].contentRect;
        SetWidthHeight(item.id, width, height);
      }, 500),
    [item.id, SetWidthHeight]
  );

  useLayoutEffect(() => {
    let RO = new ResizeObserver(onChangeSize);
    RO.observe(memoContainer.current);
    return () => {
      RO.disconnect();
      RO = null;
    };
  });

  const onChangePosition = useCallback(
    (x, y) => {
      SetPosition(item.id, x, y);
    },
    [item.id, SetPosition]
  );
  const onClickDelete = useCallback(() => Delete(item.id), [item.id, Delete]);

  // *메모가 삭제된 후 debounce()가 일어나지 않게 처리
  useEffect(() => {
    return () => {
      onChangeMemo.cancel();
      onChangeSize.cancel();
    };
  }, [onChangeMemo, onChangeSize]);

  return (
    <Draggable handleRef={handleRef} x={0} y={0} onMove={onChangePosition}>
      <div
        className='memo-container'
        style={{ width: `${250}px`, height: `${300}px` }}
        ref={memoContainer}
      >
        <div className='menu'>
          <DragHandleIcon
            ref={handleRef}
            sx={{ cursor: 'move', fontSize: '25px' }}
          />
          <CloseIcon
            sx={{ cursor: 'pointer', fontSize: '25px', float: 'right' }}
            onClick={onClickDelete}
          />
        </div>
        <textarea
          className='memo-text-area'
          defaultValue={item.content}
          name='txt'
          placeholder='Enter memo here'
          onChange={onChangeMemo}
        ></textarea>
      </div>
    </Draggable>
  );
}

export default observer(Memo);
