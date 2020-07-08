const config = require('../config.js');
// const Promise = require('bluebird');
// const MongoClient = Promise.promisifyAll(require("mongodb").MongoClient);
const MongoClient = require('mongodb').MongoClient;

const dbhost = config.dbhost;
let database = config.database;
const username = config.username;
const password = config.password;

let url;

if (username || password) {
  url = `mongodb://${username}:${password}@${dbhost}:27017/${database}`;
  console.log(`dbhost is ${dbhost} and database is ${database}`);
} else {
  url = `mongodb://localhost:27017/${database}`;
  console.log('db url is ', url);
}

const client = new MongoClient(url, { useUnifiedTopology: true });

let db;
client.connect(function(err) {
  if (err) console.error('err in db connect: ', err);
  else {
    db = client.db(database);
    console.log('connection to db successfull with return db instance... ');
  }
});

const dbFunctions = {
  add: (__collectionName, __data) => {
    return new Promise((resolve, reject) => {
      if (!__collectionName || !__data) resolve({ status: 'error', msg: 'Bad request', response: undefined });
      const collection = db.collection(__collectionName);
      collection.insertOne(__data, function(err, result) {
        if (err) {
          resolve({ status: 'success', msg: 'error while database query', response: err });
        } else if (result.insertedCount > 0) {
          resolve({ status: 'success', msg: 'successfully added' });
        }
      });
    });
  },
  update: (__collectionName, __filter, __data) => {
    console.log('__data :', __data);
    console.log('__filter :', __filter);
    // console.log(object);
    return new Promise((resolve, reject) => {
      if (!__collectionName || !__data) resolve({ status: 'error', msg: 'Bad request', response: undefined });
      const collection = db.collection(__collectionName);
      collection.updateOne(__filter, { $inc: __data }, function(err, result) {
        if (err)
          resolve({
            status: 'success',
            msg: 'error while database query',
            response: err
          });
        else if (result.modifiedCount > 0) resolve({ status: 'success', msg: 'successfully updated' });
        else resolve({ status: 'success', msg: 'nothing to update' });
      });
    });
  }
};

// exports
module.exports = { dbFunctions };
