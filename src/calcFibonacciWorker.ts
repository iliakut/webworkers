// @ts-ignore
// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.onmessage = (event) => {
  if (event.data.start) {
    calcFibonacci(event.data.n)
  }
};

const calcFibonacci = (n: number): number => {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
    sendMessage(b, i * 100);
  }
  return b;
}

const sendMessage = (number: number, time?: number): void => {
  setTimeout(() => {
    ctx.postMessage(number);
  }, time)
}