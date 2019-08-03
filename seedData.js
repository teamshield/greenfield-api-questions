const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');

const db = require('./server/database.js');

let count = 0;

let options = { highWaterMark: 256 * 1024 };

fs.createReadStream(
  path.join(__dirname, '../apiCSVs/answers_photos.csv'),
  options
)
  .pipe(csv.parse({ headers: true }))
  .on('data', (row) => {
    let photo = JSON.stringify({ id: row.id, url: row[' url'] });
    let queryEntry = `UPDATE answers SET photos = photos || $2::jsonb WHERE answer_id = $1;`;
    let arrEntry = [row[' answer_id'], photo];

    db.query(queryEntry, arrEntry, (err, result) => {
      if (err) console.log(err);
      count++;
      if ((count % 100, 000 === 0)) {
        console.log(count);
      }
    });
  })
  .on('end', () => {
    console.log('Completed adding photos');
  })
  .on('err', (err) => {
    console.log(err);
  });
