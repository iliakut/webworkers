import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [messageFor, setMessageFor] = useState('not calculated yet')
  const [messageZeroTimeout, setMessageZeroTimeout] = useState('not calculated yet')
  const number = 1e9;

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
    setMessageFor(`Common sum = ${sum} \n took ${t2 - t1} ms`)
  }

  const second = () => {
    /*
    * цикл с разбиением задачи на части
    * часть задачи выполняется в нулевом setTimeout
    * у браузера есть время что-то сделать,
    * затем выполняется следующая часть и т.д.
    * пока не выполнится весь подсчет
    */
    let i = 0;
    let sum = 0;

    let t1 = performance.now();
    function count() {
      if (i < number - 1e6) {
        setTimeout(count, 0);
      }
      do {
        i++;
        sum += i;
      } while (i % 1e6 !== 0);

      if (i === number) {
        let t2 = performance.now();
        setMessageZeroTimeout(`Zero timeout sum = ${sum} \n took ${t2 - t1} ms`)
      }
    }

    count();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <span>{messageFor}</span>
        <button onClick={() => first()}>first (common 'for')</button>
        <span>{messageZeroTimeout}</span>
        <button onClick={() => second()}>second (zero timeout)</button>
      </header>
    </div>
  );
}

export default App;
