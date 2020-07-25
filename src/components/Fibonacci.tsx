import React, {useEffect, useState} from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!../calcFibonacciWorker";

const Fibonacci: React.FC = () => {
  const worker = new Worker();
  const [fibonacciRow, setFibonacciRow] = useState([]);
  
  useEffect(() => {
    return () => {
      worker.terminate();
    }
  }, []);
  
  const calcFib = () => {
    worker.postMessage({start: true, n: 50})
  }

  worker.onmessage = (event) => {
    const newNumber: number = event.data;
    setFibonacciRow((prevValue: any): any => {
      const newValue = [newNumber].concat(prevValue)
      return newValue;
    })
  }
  
  const fibonacciCalcs = fibonacciRow.map((number) => {
    return (
      <p key={number}>{number}</p>
    )
  })
  return (
    <div>
      <button onClick={calcFib}>Calc Fibonacci</button>
      {fibonacciCalcs}
    </div>
  );
};

export default Fibonacci;
