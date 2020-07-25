import React, {useEffect, useState} from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!../calcFibonacciWorker";

const Fibonacci: React.FC = () => {
  const worker = new Worker();
  const [fibonacciRow, setFibonacciRow] = useState(['111', '22']);
  
  useEffect(() => {
    return () => {
      worker.terminate();
    }
  }, []);
  
  const calcFib = () => {
    worker.postMessage({start: true, n: 10})
  }

  worker.onmessage = (event) => {
    console.log(event.data)
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
