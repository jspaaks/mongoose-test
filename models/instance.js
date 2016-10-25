var mongoose = require('mongoose');

var instanceSchema = mongoose.Schema({
    mention_count: Number,
    name: String,
    url: String
});

module.exports = mongoose.model('Instance', instanceSchema);
