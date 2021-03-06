const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');

const db = require('./server/database.js');

let count = 0;

let options = {
  highWaterMark: 256 * 1024
};

let render = fs.createReadStream(
  path.join(__dirname, '../apiCSVs/answers_photos.csv'),
  options
);

render
  .pipe(csv.parse({ headers: true }))
  .on('data', (row) => {
    let photo = JSON.stringify({ id: row.id, url: row[' url'] });

    let queryEntry = `UPDATE answers SET photos = photos || $2::JSONB WHERE answer_id = $1;`;

    let arrEntry = [row[' answer_id'], photo];

    db.none(queryEntry, arrEntry)
      .then((results) => {
        count++;
        if (count % 100 === 0) {
          console.log(`count: `, count);
        }
      })
      .catch((err) => {
        console.log('after quesry err \n', err, '\n\n');
      });
  })
  .on('end', () => {
    console.log('Completed adding photos');
  })
  .on('err', (err) => {
    console.log(err);
  });
