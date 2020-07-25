// @ts-ignore
// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.onmessage = (event) => {
  if (event.data.start) {
    fibonacci(event.data.n)
  }
};

function fibonacci(n: number): number {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
    ctx.postMessage(b);
  }
  return b;
}