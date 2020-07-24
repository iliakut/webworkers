export default (worker: Function) => {
  // берем фукнцию - переделываем в строку
  const code = worker.toString();
  // из строки создаем blob
  const blob = new Blob(['('+code+')()']);
  // возвращаем экземпляр воркера с помозью функции, создающей файлы (см. MDN)
  return new Worker(URL.createObjectURL(blob));
}
