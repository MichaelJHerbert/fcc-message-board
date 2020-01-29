const Thread = require("../models/Thread");

module.exports = function(req, res, callback) {
  const board = req.params.board;
  // Find first 10 Threads on Board
  Thread.find({ board })
    .select("-delete_password -reported")
    .sort({ bumped_on: 'desc' })
    .limit(10)
    .populate({
      path: "replies",
      options: { sort: { created_on: "asc" }},
      select: "-delete_password -reported"
    })
    .exec(callback);
};
