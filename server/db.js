const mongodb = require('mongodb');
const config = require('../config.js');
// const Promise = require('bluebird');
// const MongoClient = Promise.promisifyAll(require("mongodb").MongoClient);
const MongoClient = require('mongodb').MongoClient;

const dbhost = config.dbhost;
let database = config.database;
const username = config.username;
const password = config.password;

let url;

console.log('db internal ip is ', config.dbinternalip);
