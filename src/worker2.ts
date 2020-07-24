// @ts-ignore
// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.onmessage = (event) => {
  console.log(event)

  const {number, t1} = event.data;

  if (number) {
    let sum = 0;

    for (let i = 0; i <= number; i++) {
      sum += i;
    }

    ctx.postMessage({sum, t1})
  }
};
