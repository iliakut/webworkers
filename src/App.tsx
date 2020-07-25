import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import worker from './worker';
import WorkerSetup from "./workerCreate";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./worker2';

/*
* worker1 - вариант воркера с конвертацией модуля в файл
* worker2 - импорт с помозью weorker-loader
*
* worker1
* WorkerSetup - функция создатель воркера (конвертит функцию в файл)
* и возвращает экземпляр ворера
* worker - просто функция, по сути код воркера
*
* worker2
* требуется установить npm пакет worker-loader
* далее объявляется модуль воркера (в файле custom.d.ts)
* далее создается файл с кодом воркера (worker2.ts)
* вся работа в файле worker2.ts ведется через переменную ctx (см. файл)
* с помощью import Worker from 'worker-loader!./worker2';
* импортится функция-создатель воркера
*
*/

const worker1 = WorkerSetup(worker);
const worker2 = new Worker();

function App() {
  const [messageFor, setMessageFor] = useState('not calculated yet')
  const [messageZeroTimeout, setMessageZeroTimeout] = useState('not calculated yet')
  const [messageWorker, setmessageWorker] = useState('not calculated yet')
  const number = 1e9;

  useEffect(() => {
    return () => {
      // размонтировать воркеры
      worker1.terminate();
      worker2.terminate();
    }
  }, []);

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
    /*
    * worker
    * цикл считается в воркере
    * поскольку это не процесс в dom
    * он выполняется параллельно
    */
    worker1.postMessage([1])
    worker2.postMessage([2])

    worker2.postMessage({number, t1: Date.now()})
  }

  worker2.onmessage = (event) => {
    const {sum, t1} = event.data;
    const t2 = Date.now();

    setmessageWorker(`WebWorker sum = \n ${sum} \n took \n ${t2 - t1} ms`)
  };

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
