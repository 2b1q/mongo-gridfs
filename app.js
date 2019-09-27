const MongoGrid = require('./mongo-grid');
const fs = require('fs');
const file = process.env.file || 'traktor.mp4';
const assert = require('assert');

const mGrid = new MongoGrid();

mGrid
  .getBucketP()
  .then(bucket =>
    fs
      .createReadStream('./' + file)
      .pipe(bucket.openUploadStream(file))
      .on('error', error => assert.ifError(error))
      .on('finish', () => {
        console.log('Upload done done!');
        process.exit(0);
      })
  )
  .catch(err => {
    console.log('error while connecting to gridfd:', err);
    process.exit(1);
  });
