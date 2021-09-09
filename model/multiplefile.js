const mongoose = require('mongoose');

const multi = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    photo: [Object],
  },
  { timestamps: true },
);

module.exports = mongoose.model('album', multi);
