require("./../config/MongoDB");

const { model, Schema } = require("mongoose");

const schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  lists: {
    type: Array,
    required: true,
  },
  text: String,
  upTime: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: String,
    default: 0,
  },
});

const Picture = model("picture", schema);

module.exports = Picture;
