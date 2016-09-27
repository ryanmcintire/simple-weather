const mongoose = require('mongoose');
mongoose.connect(require('./mongo_config').dburl);
module.exports = mongoose;

