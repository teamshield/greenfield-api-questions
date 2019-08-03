const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');

const db = require('./server/database.js');

let count = 0;

//
let options = {
  // start: 0,
  // end: 100,
  highWaterMark: 256 * 1024
};

let render = fs.createReadStream(
  path.join(__dirname, '../apiCSVs/answers_photos.csv'),
  options
);

render.pipe(csv.parse({ headers: true })).on('data', (row) => {
  console.log('row', row);
  let photo = `UPDATE answers SET photos = photos || $2::jsonb WHERE answer_id = $1;`;
});

// render.pipe(csv.parse({ headers: true })).on('data', (row) => {
//   let photo = JSON.stringify({ id: row.id, url: row[' url'] });
//   let queryEntry = `UPDATE answers SET photos = photos || $2::jsonb WHERE answer_id = $1;`;
//   let arrEntry = [row[' answer_id'], photo];

//   db.query(queryEntry, arrEntry, (err, result) => {
//     if (err) {
//       console.log(`on data err: \n`, err);
//     }
//     count++;
//     if (count % 1000 === 0) {
//       console.log(count);
//     }
//   });
// });
// close event
// .on('end', () => {
//   console.log('Completed adding photos');
// })
// .on('err', (err) => {
//   console.log(err);
// });

// TEST FILE READ
// reader = fs.createReadStream(path.join(__dirname, './README.md'), {
//   flag: 'a+',
//   encoding: 'ascii',
//   start: 8,
//   end: 64,
//   highWaterMark: 16
// });

// reader.on('data', (chunk) => {
//   console.log(chunk.toString());
// });
