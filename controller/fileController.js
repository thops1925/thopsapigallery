const single = require('../model/Album');
const multiple = require('../model/multiplefile');

const singleFileUpload = async (req, res) => {
  try {
    const file = new single({
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormat(req.file.size, 2),
    });
    await file.save();
    console.log(file);
    res.status(201).send('good');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const multipleFile = async (req, res) => {
  try {
    let filer = [];
    req.files.forEach((element) => {
      const files = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormat(element.size, 2),
      };
      filer.push(files);
    });
    const fileSave = new multiple({
      title: req.body.title,
      photo: filer,
    });
    console.log(fileSave);
    await fileSave.save();
    res.status(201).send('good');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getallSingleFiles = async (req, res, next) => {
  try {
    const files = await single.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getallMultipleFiles = async (req, res, next) => {
  try {
    const files = await multiple.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const fileSizeFormat = (bytes, decimal) => {
  if (bytes === 0) {
    return '0 bytes';
  }
  const dm = decimal || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const index = Math.floor(Math.log(bytes / dm) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index]
  );
};

module.exports = {
  singleFileUpload,
  multipleFile,
  getallSingleFiles,
  getallMultipleFiles,
};
