const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const route = require('./route');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// img upload stuff
// const crypto = require('crypto');
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/kitchen');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
// app.use(methodOverride('_method'));
route(app);

// init gfs
// let gfs;

const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log(`Localhost running on ${port}`);