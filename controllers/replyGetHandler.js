const Thread = require("../models/Thread");
const Reply = require("../models/Reply");

module.exports = function(req, res, callback) {
  const thread_id = req.query.thread_id;
  Thread.findById(thread_id)
    .select("-delete_password -reported")
    .populate({
      path: "replies",
      options: { sort: { created_on: "asc" } },
      select: "-delete_password -reported"
    })
    .exec(callback);
};