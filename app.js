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

const { dbFunctions } = require('./server/counter-db');

app.post('/api/todoApp/add', async (req, res) => {
  console.log('req.body :', req.body.data);
  let dbResponse = await dbFunctions.add('todoData', req.body.data);
  if (dbResponse.status == 'success') return res.status(201).json({ status: 'success', response: dbResponse.response });
  else return res.status(422).json({ status: 'error', response: 'Bad request!' });
});
