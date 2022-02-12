const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const api = require('./routes/api');

const app = express();

//cors middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));

//logs middleware
app.use(morgan('combined'));

//json middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')))

//versioning middleware
app.use('/v1', api);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;