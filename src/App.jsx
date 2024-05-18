import Button from './components/button';
import React from 'react';

function App() {
  return (
    <div className="flex justify-center bg-slate-700 min-h-screen items-center">
      <div className="flex gap-x-5">
        <Button warna="bg-red-500" buttonName="buy now"></Button>
        <Button warna="bg-red-500" buttonName= "clear now"></Button>
      </div>
    </div>
  );
}

export default App;
