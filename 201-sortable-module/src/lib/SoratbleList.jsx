import React from 'react';
import { useState, useCallback } from 'react';
import SortableListItem from './SoratbleListItem';
import './SortableListItem.css';

function SoratbleList({ data, onDropItem, onClickItem, renderItem }) {
  const [startIndex, setStartIndex] = useState(0);
  const [listData, setListData] = useState(data);

  const onDragStart = (index) => {
    setStartIndex(index);
  };
  const onDrop = useCallback(
    (dropIndex) => {
      const dragItem = listData[startIndex];
      const list = [...listData];
      list.splice(startIndex, 1); // drop될 index를 splice로 잘라내고 newListData를 추가
      const newListData =
        startIndex < dropIndex
          ? [
              ...list.slice(0, dropIndex - 1),
              dragItem,
              ...list.slice(dropIndex - 1, list.length),
            ]
          : [
              ...list.slice(0, dropIndex),
              dragItem,
              ...list.slice(dropIndex, list.length),
            ];
      setListData(newListData);
      onDropItem(newListData);
    },
    [listData, onDropItem, startIndex]
  );

  return (
    <ul>
      {/* eslint-disable-next-line array-callback-return */}
      {listData.map(function (item, index) {
        <SortableListItem
          key={index}
          index={index}
          draggable={true}
          onDragItem={onDrop}
          onDragStart={onDragStart}
          onClickItem={onClickItem}
        >
          {renderItem(item, index)}
        </SortableListItem>;
      })}
      <SortableListItem
        key={listData.length}
        index={listData.length}
        draggable={false}
        onDragItem={onDrop}
        onDragStart={onDragStart}
        onClickItem={onClickItem}
      />
    </ul>
  );
}

export default SoratbleList;
