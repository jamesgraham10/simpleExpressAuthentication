const mongoose = require('mongoose');
const dbUri = 'mongodb://localhost:27017/myTest';
mongoose.connect(dbUri);

module.exports = mongoose;