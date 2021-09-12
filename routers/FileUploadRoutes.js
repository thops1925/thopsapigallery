const express = require('express');
const { Upload } = require('../helper/filehelper');
const {
  singleFileUpload,
  multipleFile,
  getallSingleFiles,
  getallMultipleFiles,
} = require('../controller/fileController');
const router = express.Router();

router.post('/single', Upload.single('image'), singleFileUpload);
router.post('/multiple', Upload.array('images'), multipleFile);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);

module.exports = { routes: router };
