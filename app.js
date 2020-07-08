// package requires
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//express server code
let app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
const port = process.env.PORT || 8484;
app.listen(port, function() {
  console.log('server listening on port ' + port);
});

app.use(require('./routes')); //api router
