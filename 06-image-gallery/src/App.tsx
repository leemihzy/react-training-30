import { useRef, useState } from 'react';
import './App.css';
import ImageBox from './components/ImageBox';

function App() {
  const inpRef = useRef<HTMLInputElement>(null); // id를 최대한 사용하지 않게 만듦
  const [imageList, setImageList] = useState<string[]>([]);
  console.log(imageList.length);

  return (
    <div className='container'>
      <div className={'gallery-box' + (imageList.length > 0 ? ' row' : '')}>
        {imageList.length === 0 && (
          <div className='text-center'>
            이미지가 없습니다.
            <br />
            이미지를 추가해주세요.
          </div>
        )}
        <input
          type='file'
          ref={inpRef}
          onChange={(event) => {
            // console.log(event.currentTarget.files?.[0]);
            if (event.currentTarget.files?.[0]) {
              const file = event.currentTarget.files[0];
              console.log(file.name);
              const reader = new FileReader();

              reader.readAsDataURL(file);
              reader.onloadend = (event) => {
                setImageList((prev) => [
                  ...prev,
                  event.target?.result as string,
                ]);
              };
            }
          }}
        />
        {imageList.map((image) => (
          <ImageBox key={image} src={image} />
        ))}
        <div className='plus-box' onClick={() => inpRef.current?.click()}>
          +
        </div>
      </div>
    </div>
  );
}

export default App;
