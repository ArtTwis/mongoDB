const config = require('./config.js');
const MongoClient = require('mongodb').MongoClient;

const dbhost = config.dbhost;
const database = config.database;
const username = config.username;
const password = config.password;

let url;

if (username || password) {
  url = `mongodb://${username}:${password}@${dbhost}:27017/${database}`;
  console.log(`dbhost is ${dbhost} and database is ${database}`);
} else {
  url = `mongodb://${dbhost}:27017/${database}`;
  console.log(`dbhost is : ${dbhost}\ndatabase is ${database}`);
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
        if (err)
          resolve({
            status: 'success',
            msg: 'error while database query',
            response: err
          });
        else resolve({ status: 'success', response: result });
      });
    });
  },

  update: (__collectionName, __filter, __data) => {
    // console.log(object);
    return new Promise((resolve, reject) => {
      if (!__collectionName || !__data) resolve({ status: 'error', msg: 'Bad request', response: undefined });
      const collection = db.collection(__collectionName);
      collection.updateOne(__filter, { $set: __data }, function(err, result) {
        if (err)
          resolve({
            status: 'success',
            msg: 'error while database query',
            response: err
          });
        else resolve({ status: 'success', response: result });
      });
    });
  },

  remove: (__collectionName, __filter) => {
    return new Promise((resolve, reject) => {
      if (!__collectionName || !__filter) resolve({ status: 'error', msg: 'Bad request', response: undefined });
      const collection = db.collection(__collectionName);
      collection.deleteOne(__filter, function(err, result) {
        if (err)
          resolve({
            status: 'error',
            msg: 'error while database query',
            response: err
          });
        else resolve({ status: 'success', response: result });
      });
    });
  },

  find: (__collectionName, __filter) => {
    return new Promise((resolve, reject) => {
      if (!__collectionName || !__filter) resolve({ status: 'error', msg: 'Bad request', response: undefined });
      const collection = db.collection(__collectionName);
      collection.findOne(__filter, function(err, docs) {
        if (err)
          resolve({
            status: 'error',
            msg: 'error while database query',
            response: err
          });
        else resolve({ status: 'success', response: docs });
      });
    });
  },

  findAll: (__collectionName, __filter) => {
    return new Promise((resolve, reject) => {
      if (!__collectionName) resolve({ status: 'error', msg: 'Bad request', response: undefined });
      const collection = db.collection(__collectionName);
      collection
        .find(__filter)
        .sort({ timeStamp: 1 })
        .toArray(function(err, docs) {
          if (err)
            resolve({
              status: 'error',
              msg: 'error while database query',
              response: err
            });
          else
            resolve({
              status: 'success',
              msg: 'query successful',
              response: docs
            });
        });
    });
  }
};

module.exports = { dbFunctions };
