// @ts-ignore
// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

// Post data to parent thread
ctx.postMessage({ foo: 'foo' });

// Respond to message from parent thread
ctx.onmessage = (event) => {
  console.log(event)
};
