const replyPostHandler = require("../controllers/replyPostHandler");
const replyPutHandler = require("../controllers/replyPutHandler");
const replyDeleteHandler = require("../controllers/replyDeleteHandler");
const replyGetHandler = require("../controllers/replyGetHandler");

module.exports = function(app) {
  app
    .route("/api/replies/:board")
    .post(function(req, res) {
      replyPostHandler(req, res, function(err, thread) {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.redirect(`/b/${thread.board}/${thread._id}`);
        }
      });
    })
    .put(function(req, res) {
      replyPutHandler(req, res, function(err) {
        if (err) {
          res.send(err.message);
        } else {
          res.send('Successfully Reported Reply');
        }
      });
    })
    .delete(function(req, res) {
      replyDeleteHandler(req, res, function(err) {
        if(err){
          res.send(err.message);
        } else {
          res.send('Successfully Deleted Reply');
        }
      });
    })
    .get(function(req, res) {
      replyGetHandler(req, res, function(err, thread) {
        if(err){
          res.status(500).send(err.message);
        } else {
          res.json(thread);
        }        
      });
    });
};

// NEXT to do: get request for replies check glitch??
