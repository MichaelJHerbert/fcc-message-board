const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
  text: String,
  created_on: { type: Date, default: new Date() },
  bumped_on: { type: Date, default: new Date() },
  reported: { type: Boolean, default: false },
  delete_password: String  
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;