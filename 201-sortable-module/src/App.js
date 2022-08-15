import SortableList from './lib/SoratbleList';
import { data } from './TestItem/testData';
import TestItem from './TestItem/TestItem';

function App() {
  const onClikItem = (index) => alert(index);
  const onDropItem = (newList) => console.log(newList);

  return (
    <SortableList
      data={data}
      renderItem={(item, index) => <TestItem data={item} index={index} />}
      onDropItem={onDropItem}
      onClickItem={onClikItem}
    ></SortableList>
  );
}

export default App;
