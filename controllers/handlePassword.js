const bcrypt = require('bcrypt');

let saltRounds = process.env.SALT_ROUNDS;

module.exports = function (plainTextPassword, callback){
  if(typeof saltRounds != 'number'){
    saltRounds = Number.parseInt(saltRounds);
  }
  
  bcrypt.hash(plainTextPassword, saltRounds, function(err, hash){
    if(err){
      return callback(err);
    } else {
      return callback(null, hash);
    }
  });
}