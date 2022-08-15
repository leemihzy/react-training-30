import React from 'react';
import { useRef } from 'react';

function SoratbleListItem({
  index,
  draggable,
  children,
  onDragStart,
  onDragItem,
  onClickItem,
}) {
  const itemRef = useRef(null);
  const onDragStartItem = () => {
    itemRef.current.classList.add('dragstart');
    onDragStart(index);
  };
  const onDragEnd = () => {
    itemRef.current.classList.remove('dragstart');
  };
  const onDragEnter = () => {
    itemRef.current.classList.add('dragover');
  };
  const onDragLeave = () => {
    itemRef.current.classList.remove('dragover');
  };
  const onDragOver = (e) => e.preventDefault();
  const onDrop = () => {
    itemRef.current.classList.remove('dragover');
    onDragItem(index);
  };
  const onClick = () => onClickItem(index);
  return (
    <li
      ref={itemRef}
      className='item'
      draggable={draggable ? draggable : false}
      onDragStart={onDragStartItem}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

export default SoratbleListItem;
