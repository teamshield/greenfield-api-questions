const before = [[2144.99, 0.736], [5967.155, 2.46], [1065.861, 2.405]];

console.log(2144.99 / 0.736);

const more = (arr) => {
  return arr.map((elem) => {
    return elem[0] / elem[1];
  });
};

console.log('more(before)', more(before));
