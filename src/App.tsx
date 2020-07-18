import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [sumMessage, setSumMesssage] = useState('not calculated yet')
  const number = 1000000000;
  const halfNumber = number / 2;

  const first = () => {
    /*
    * Обычный цикл приводит к зависанию интерфейса
    */
    let t1 = performance.now();
    let sum = 0;
    for (let i = 0; i <= number; i++) {
      sum += i;
    }
    let t2 = performance.now()
    setSumMesssage(`Common  sum = ${sum} \n took ${t2 - t1} ms`)
  }

  const second = () => {
    // let i = 0;
    // let t1 = performance.now();
    // let sum = 0;
    //
    // function count() {
    //   do {
    //     sum += i;
    //   } while (i <= halfNumber);
    //
    //   if (i === number) {
    //     let t2 = performance.now()
    //     setSumMesssage(`Timer sum = ${sum} \n took ${t2 - t1} ms`)
    //   } else {
    //     setTimeout(count, 0);
    //   }
    // }
    //
    // count();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <span>{sumMessage}</span>
        <button onClick={() => first()}>first (common 'for')</button>
        <button onClick={() => second()}>second (zero timeout)</button>
      </header>
    </div>
  );
}

export default App;
