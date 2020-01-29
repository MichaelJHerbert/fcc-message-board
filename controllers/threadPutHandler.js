const Thread = require("../models/Thread");

module.exports = function(req, res, callback) {
  const thread_id = req.body.thread_id;
  // Find Thread in database
  Thread.findByIdAndUpdate(
    thread_id,
    { $set: { reported: true, bumped_on: new Date() } },
    { new: true },
    function(err, thread) {
      if (err || !thread) {
        return callback(new Error("Failed to Report Thread"));
      } else {
        return callback(null);
      }
    }
  );
};
