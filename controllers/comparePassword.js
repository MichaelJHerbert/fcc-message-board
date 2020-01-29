const bcrypt = require('bcrypt');

module.exports = function (plainTextPassword, hash, callback){
  bcrypt.compare(plainTextPassword, hash, function(err, res){
    if(err){
      return callback(err);
    } else {
      return callback(null, res);
    }
  });
}