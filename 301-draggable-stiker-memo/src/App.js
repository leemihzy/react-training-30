import Draggable from '@leemihzy/draggable';
import { useRef } from 'react';

function App() {
  const handle = useRef(null);
  return (
    <>
      <Draggable
        handleRef={handle}
        onMove={(x, y) => console.log(x, y)}
        x={0}
        y={0}
      >
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'aqua',
          }}
        >
          <button ref={handle}>Move</button>
        </div>
      </Draggable>
    </>
  );
}

export default App;
