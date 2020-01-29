const Reply = require("../models/Reply");
const Thread = require("../models/Thread");
const handlePassword = require("./handlePassword");

module.exports = function(req, res, callback) {
  const { board, thread_id, text, delete_password } = req.body;
  // Salt and Hash Password
  handlePassword(delete_password, function(err, hash) {
    if (err) {
      return callback(err);
    } else {
      // Create new Reply in database
      Reply.create(
        {
          text,
          delete_password: hash
        },
        function(err, reply) {
          if (err) {
            return callback(err);
          } else {
            // Find Thread & Add Reply
            Thread.findByIdAndUpdate(
              thread_id,
              { $push: { replies: reply._id }, $set: { bumped_on: new Date() }},
              { new: true },
              callback
            );
          }
        }
      );
    }
  });
};
