const threadPostHandler = require('../controllers/threadPostHandler');
const threadPutHandler = require('../controllers/threadPutHandler');
const threadDeleteHandler = require('../controllers/threadDeleteHandler');
const threadGetHandler = require('../controllers/threadGetHandler');

module.exports = function(app){
  app.route('/api/threads/:board')
  .post(function(req, res){
    threadPostHandler(req, res, function(err, thread){
      if(err){
        res.status(500).send(err.message);
      } else {
        res.redirect(`/b/${thread.board}`); 
      }
    });
  })
  .put(function(req, res){
    threadPutHandler(req, res, function(err){
      if(err){
        res.send(err.message);
      } else {
        res.send('Successfully Reported Thread');
      }
    });
  })
  .delete(function(req, res){
    threadDeleteHandler(req, res, function(err){
      if(err){
        res.send(err.message);
      } else {
        res.send('Successfully Deleted Thread');
      }
    });
  })
  .get(function(req, res){
    threadGetHandler(req, res, function(err, threads){
      if(err){
        res.status(500).send(err.message);
      } else {
        res.json(threads);
      }
    });
  });
}