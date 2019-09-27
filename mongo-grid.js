const mongodb = require('mongodb');

class MongoGridClient {
  constructor() {
    this.PORT = process.env.mongo_port || 27017;
    this.HOST = process.env.mongo_host || 'localhost';
    this.dbName = process.env.mongo_db || 'grid';
    this.URI = `mongodb://${this.HOST}:${this.PORT}`;
    this.OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
    this.client = new mongodb.MongoClient(this.URI, this.OPTIONS);
  }

  // init grid connection return cb(err, gridBucket)
  getBucket(cb) {
    // singleton
    if (this.gridBucket) {
      return cb(null, this.gridBucket);
    }
    this.client.connect(err => {
      if (err) {
        console.error('MongoClient connection err: ', err);
        return cb(err);
      }
      this.db = this.client.db(this.dbName);
      // instantiate GridFSBucket
      this.gridBucket = new mongodb.GridFSBucket(this.db);
      return cb(null, this.gridBucket);
    });
  }

  // getBucket(cb) Promise wrapper
  getBucketP() {
    return new Promise((resolve, reject) =>
      this.getBucket((err, bucket) => {
        if (err) return reject(err);
        resolve(bucket);
      })
    );
  }
}

module.exports = MongoGridClient;
