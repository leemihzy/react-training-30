import React from 'react';
import { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import './Draggable.css';
import { debounce } from 'underscore';

const Draggable = ({
  children,
  handleRef,
  onMove,
  x = 0,
  y = 0
}) => {
  const dragRef = useRef(null);
  const initialX = useRef(0);
  const initialY = useRef(0);
  const [position, setPosition] = useState({
    x,
    y
  }); // *만약 대상이 삭제되어도 Move()는 삭제여부와 상관없이 진행하기 떄문에 오류발생, 실행이 끝나는 데서 cancel()이 필요함

  const Move = useMemo(() => debounce((x, y) => onMove(x, y), 800), [onMove]); //debounce(실행싴닐 함수, 몇초뒤로 실행시킬것인지)

  const onMouseMove = useCallback(event => {
    setPosition({
      x: event.clientX - initialX.current,
      y: event.clientY - initialY.current
    }); // console.log(event.clientX, event.clientY);
    // console.log(initialX.current, initialY.current);
    // console.log(
    //   event.clientX - initialX.current,
    //   event.clientY - initialY.current
    // );

    Move(event.clientX - initialX.current, event.clientY - initialY.current);
  }, [Move]);
  const removeEvents = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', removeEvents);
    document.removeEventListener('mouseleave', removeEvents);
  }, [onMouseMove]);
  const onMouseDown = useCallback(event => {
    const {
      left,
      top
    } = dragRef.current.getBoundingClientRect();
    initialX.current = event.clientX - left;
    initialY.current = event.clientY - top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', removeEvents);
    document.addEventListener('mouseleave', removeEvents);
  }, [onMouseMove, removeEvents]);
  useEffect(() => {
    const handle = handleRef.current; // console.log(handle);

    handle.addEventListener('mousedown', onMouseDown);
    return () => {
      handle.addEventListener('mousedown', onMouseDown);
      Move.cancel();
    };
  }, [handleRef, onMouseDown, Move]);
  return /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "draggable",
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`
    }
  }, children);
};

export default Draggable;