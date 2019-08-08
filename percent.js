const sizes = [
  '610 MB  | 757 MB',
  '2869 MB | 3134 MB',
  '757 MB  | 828 MB',
  '3134 MB | 3134 MB',
  '828 MB  | 900 MB',
  '3134 MB | 3386 MB'
];

const fromFirst = (arr) => {
  return arr.map((elem) => {
    let compare = elem
      .split(' MB')
      .join('')
      .split(' | ');
    return compare[0];
  });
};

const tableSize = (arr) => {
  return arr.map((elem) => {
    let compare = elem
      .split(' ms')
      .join('')
      .split(' | ');
    return compare[0];
  });
};

const tableSizes = tableSize(sizes);
console.log('tableSizes', tableSizes, '\n');

const before = [
  // `13.387 ms    | 10.171 ms`,
  `26115.176 ms | 10.171 ms`,
  `10.171 ms | 4.363 ms`,
  `2.405 ms  | 2.846 ms`,
  `2.846 ms | 0.057 ms`,
  `16770.346 ms | 117.709 ms`,
  `14710.889 ms | 69.198 ms`,
  `69.131 ms  | 87.677 ms`,
  `130.562 ms | 68.126 ms`,
  `87.677 ms | 75.297 ms`,
  `68.126 ms | 53.964 ms`
];

const data = `0.736 ms | 0.097 ms`;

const calc = (arr) => {
  return arr.map((elem) => {
    let compare = elem
      .split(' ms')
      .join('')
      .split(' | ');
    return ((compare[0] - compare[1]) / compare[0]) * 100;
  });
};

const times = calc(before);
console.log('times', times, `\n\n\n`);

const compareToBegin = (arr, initial) => {
  const convert = initial
    .split(' ms')
    .join('')
    .split(' | ')[0];

  console.log(convert);

  return arr.map((elem) => {
    let compare = elem
      .split(' ms')
      .join('')
      .split(' | ')[0];
    return (convert - compare / convert) * 100;
  });
};

const initialElems = compareToBegin(before, before[0]);
console.log('\n initialElems', initialElems);
