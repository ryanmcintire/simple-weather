const mongoose = require('mongoose'),
      bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String,
  admin: Boolean,
  cities: [
    {
      city: String,
      country: String
    }
  ]

});

// userSchema.pre('save', function(next) {
//   console.log('pre save...');
//   const user = this;
//   bcrypt.genSalt(10, function(err, salt) {
//     if (err) return next(err);
//
//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       console.log(user.password);
//       next();
//     });
//   });
// });

userSchema.methods.passwordCompare = function(submittedPassword, cb) {
  console.log('this password: ' + this.password);
  console.log('submitted password: ' + submittedPassword);
  bcrypt.compare(submittedPassword, this.password, function(err, isMatch) {
    console.log('submitted password in compare: ' + submittedPassword);
    console.log('is matching? ' + isMatch);
    if (err) { return cb(err); }
    cb(null, isMatch);
  })
};


module.exports = mongoose.model('user', userSchema);

module.exports.createNewUser = function(user, cb) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      user.save(cb);
    });
  });
};



