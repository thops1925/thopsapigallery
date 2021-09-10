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

app.use(cors());
app.use(express.json());
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/api', photo.routes);
app.listen(5000 || process.env.PORT, () => console.log('connected'));
