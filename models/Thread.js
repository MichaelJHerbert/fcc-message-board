const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  board: String,
  text: String,
  created_on: {
    type: Date,
    default: new Date()
  },
  bumped_on: {
    type: Date,
    default: new Date()
  },
  reported: {
    type: Boolean,
    default: false
  },
  delete_password: String,
  replies: [{ type: Schema.Types.ObjectID, ref: "Reply" }]
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
