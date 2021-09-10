require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const photo = require('./routers/FileUploadRoutes');
const app = express();
mongoose.connect(
  'mongodb+srv://may21987:may21987@cluster0.0n05x.mongodb.net/gallery?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
mongoose.connection.once('open', () => {
  console.log('open connection');
});

app.use(cors());
app.use(express.json());
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/api', photo.routes);
app.listen(5000, () => console.log('connected'));
