require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const photo = require('./routers/FileUploadRoutes');
const app = express();
mongoose.connect(process.env.API, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('open connection');
});
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/api', photo.routes);
app.listen(port, () => console.log('connected'));
