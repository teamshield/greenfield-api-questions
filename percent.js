const before = [
  `0.736 ms | 0.097 ms`,
  `2.405 ms | 0.158 ms`,
  `69.131 ms  | 64.397 ms`,
  `130.562 ms | 120.413 ms`,
  `64.397 ms  | 41.473 ms`,
  `120.413 ms | 74.695 ms`
];

const data = `0.736 ms | 0.097 ms`;

const calc = (arr) => {
  return arr.map((elem) => {
    let compare = elem
      .split(' ms')
      .join('')
      .split(' | ');
    return compare[0] / compare[1];
  });
};

const times = calc(before);
console.log('times', times);

const sizes = [
  '534 MB  | 610 MB',
  '1886 MB | 2151 MB',
  '2120 MB | 2385 MB',
  '610 MB  | 757 MB',
  '2385 MB | 2637 MB'
];

const calcSize = (arr) => {
  return arr.map((elem) => {
    let compare = elem
      .split(' MB')
      .join('')
      .split(' | ');
    return ((compare[1] - compare[0]) / compare[0]) * 100;
  });
};

const tableSizes = calcSize(sizes);
console.log('tableSizes', tableSizes);
