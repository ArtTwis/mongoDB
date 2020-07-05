const express = require('express');
const router = express.Router();
const _ = require('lodash');
const path = require('path');
const url = require('url');
// constants
const collectionName = 'mongoDbTest';
const { dbFunctions } = require(path.join(process.cwd(), 'server', 'db.js'));
