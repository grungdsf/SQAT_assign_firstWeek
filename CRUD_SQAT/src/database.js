const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/crud';

mongoose.connect(uri)
.then(db => console.log('connection success'))
.catch(err => console.log(err));

module.exports = mongoose;