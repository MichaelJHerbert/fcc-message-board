const Thread = require("../models/Thread");
const comparePassword = require("./comparePassword");

module.exports = function(req, res, callback) {
  const { thread_id, delete_password } = req.body;
  // Find Thread in Database
  Thread.findById(thread_id, function(err, thread) {
    if (err || !thread) {
      return callback(new Error("Could not find thread in database"));
    } else {
      // Check Password is Correct
      comparePassword(delete_password, thread.delete_password, function(err, res) {
        if (err) {
          return callback(err);
        } else if (res == true) {
          // Remove Thread as Password is Correct
          Thread.findByIdAndRemove(thread_id, function(err, deletedThread) {
            if (err || !deletedThread) {
              return callback(new Error("Could not delete thread in database"));
            } else {
              return callback(null);
            }
          });
        } else {
          return callback(new Error("Incorrect Password"));
        }
      });
    }
  });
};
