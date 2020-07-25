// @ts-ignore
// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.onmessage = (event) => {
  console.log(event)

  const {number, t1, callError} = event.data;

  if (number) {
    let sum = 0;

    for (let i = 0; i <= number; i++) {
      sum += i;
    }

    ctx.postMessage({sum, t1})
  }

  if (callError) {
    throw 'Error';
  }
};

ctx.onerror = () => {
  console.log('Ups, worker2 error')
}
