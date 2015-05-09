var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//This will be used in order to create the schema for the objects.
var Schema   = mongoose.Schema;

//This object will be maped to a database colection.
var UserSchema   = new Schema({
  username: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true, select: false },
  userinfo: { type: String, required: true}
});

//Hash the password before the user is saved.
UserSchema.pre('save', function(next) {
  var user = this;

  //Hash the password only if the password has been changed or user is new.
  if (!user.isModified('password')) {
    return next();
  }

  //Generate the hash.
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) {
      return next(err);
    }

    //Change the password to the hashed version.
    user.password = hash;
    next();
  });
});

//Method to compare a given password with the database hash.
UserSchema.methods.comparePassword = function(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
