require("./../config/MongoDB");

const { model, Schema } = require("mongoose");

const schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  nick: {
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
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
});

const Picture = model("picture", schema);

module.exports = Picture;
