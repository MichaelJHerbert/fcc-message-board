const Reply = require("../models/Reply");
const Thread = require("../models/Thread");
const comparePassword = require("./comparePassword");

module.exports = function(req, res, callback) {
  const { thread_id, reply_id, delete_password } = req.body;
  // Find Reply in Database
  Reply.findById(reply_id, function(err, reply) {
    if (err || !reply) {
      return callback(new Error("Could Not Find Reply"));
    } else {
      // Check password
      comparePassword(delete_password, reply.delete_password, function(err, res) {
        if (err) {
          return callback(err);
        } else if (res == true) {
          // Password correct
          // Set Reply Text to 'Deleted'
          Reply.findByIdAndUpdate(
            reply_id,
            { $set: { text: '[deleted]', bumped_on: new Date() } },
            { new: true },
            function(err, updatedReply) {
              if (err) {
                return callback(err);
              } else {
                return callback(null);
              }
            }
          );
        } else {
          // Password Incorrect
          return callback(new Error("Incorrect Password"));
        }
      });
    }
  });
};
