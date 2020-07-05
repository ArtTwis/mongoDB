const express = require('express');
const router = express.Router();

router.use('/mock', require('./mock'));

module.exports = router;
