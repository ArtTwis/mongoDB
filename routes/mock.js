const express = require('express');
const router = express.Router();
const _ = require('lodash');
const path = require('path');
const url = require('url');
// constants
const collectionName = 'tokencounter';
const { dbFunctions } = require(path.join(process.cwd(), 'server', 'db.js'));

module.exports = router;

router.post('/add', saveEntry);
router.put('/update', updateCount);

async function saveEntry(req, res) {
  let dbResponse = await dbFunctions.add(collectionName, req.body);
  if (dbResponse.status == 'success') return res.status(201).json(dbResponse);
  return res.status(500).json(dbResponse);
}

async function updateCount(req, res) {
  let dbResponse = await dbFunctions.update(collectionName, req.body.filter, req.body.updateObj);
  if (dbResponse.status == 'success') return res.status(201).json(dbResponse);
  return res.status(500).json(dbResponse);
}
