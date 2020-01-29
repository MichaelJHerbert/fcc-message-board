const Thread = require("../models/Thread");
const handlePassword = require("./handlePassword");

module.exports = function(req, res, callback) {
  const { text, delete_password } = req.body;
  const board = req.params.board;
  // Salt and Hash Password
  handlePassword(delete_password, function(err, hash) {
    if (err) {
      return callback(err);
    } else {
      // Create new Thread in database
      Thread.create(
        {
          board,
          text,
          delete_password: hash
        },
        callback
      );
    }
  });
};
