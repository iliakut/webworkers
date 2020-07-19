import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [messageFor, setMessageFor] = useState('not calculated yet')
  const [messageZeroTimeout, setMessageZeroTimeout] = useState('not calculated yet')
  const [messageWorker, setmessageWorker] = useState('not calculated yet')
  const number = 1e9;

  const first = () => {
    /*
    * Обычный цикл приводит к зависанию интерфейса
    */
    let t1 = Date.now();
    let sum = 0;
    for (let i = 0; i <= number; i++) {
      sum += i;
    }
    let t2 = Date.now()
    setMessageFor(`Common sum = \n ${sum} \n took \n ${t2 - t1} ms`)
  }

  const second = () => {
    /*
    * цикл с разбиением задачи на части
    * часть задачи выполняется в нулевом setTimeout
    * у браузера есть время что-то сделать,
    * затем выполняется следующая часть и т.д.
    * пока не выполнится весь подсчет
    * в таком случае можно отображать прогресс процесса
    */
    let i = 0;
    let sum = 0;

    let t1 = Date.now();
    let t2;
    function count() {
      if (i < number - 1e6) {
        // для отображения прогресса
        // t2 = Date.now();
        // setMessageZeroTimeout(`Zero timeout sum = \n ${sum} \n took \n ${t2 - t1} ms`)
        setTimeout(count, 0);
      }
      do {
        i++;
        sum += i;
      } while (i % 1e6 !== 0);

      if (i === number) {
        t2 = Date.now();
        setMessageZeroTimeout(`Zero timeout sum = \n ${sum} \n took \n ${t2 - t1} ms`)
      }
    }

    count();
  }

  const third = () => {
    if (window.Worker) {
      const myWorker = new Worker("worker.js");
      myWorker.postMessage(number);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <pre>{messageFor}</pre>
        <button onClick={() => first()}>first (common 'for')</button>
        <pre>{messageZeroTimeout}</pre>
        <button onClick={() => second()}>second (zero timeout)</button>
        <pre>{messageWorker}</pre>
        <button onClick={() => third()}>third (web worker)</button>
      </header>
    </div>
  );
}

export default App;
