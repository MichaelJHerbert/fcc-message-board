const Reply = require("../models/Reply");
const Thread = require("../models/Thread");

module.exports = function(req, res, callback) {
  const { reply_id, thread_id } = req.body;
  // Update Reply in Database
  Reply.findByIdAndUpdate(
    reply_id,
    { $set: { reported: true, bumped_on: new Date() } },
    { new: true },
    function(err, reply) {
      if (err || !reply) {
        return callback(new Error("Failed to Report Reply"));
      } else {
        return callback(null)
      }
    }
  );
};
