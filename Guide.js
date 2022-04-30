const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guideSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
  nsfw: {
    type: Boolean,
  },
  //todo set owner default value from localstorage
  owner: {
    type: String,
    // default: '',
  },
});

module.exports = mongoose.model('Guide', guideSchema);
