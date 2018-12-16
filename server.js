const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//  = Logging =

const logger = require('console-probe');
const debug = require('debug');
const serverDebug = debug('app:server');
const dbDebug = debug('app:db');

//  = Init routers =

const notesRouter = require('./routes/notes');

//  = Init app =

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(require('./config/db').uri, { useNewUrlParser: true })
  .then(() => dbDebug('connected to mongodb'))
  .catch(err => console.log(err));

//  = Routes =

app.use('/api/notes', notesRouter);


const port = process.env.port || 3001;

app.listen(port, () => {
  serverDebug(`listening on port ${port}`);
});