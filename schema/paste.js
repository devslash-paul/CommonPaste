var mongoose = require('mongoose');
mongoose.set('debug', true);

var pasteSchema = mongoose.Schema({
    text: String,
    css: String,
    day: Number,
    month: Number,
    year: Number,
    heading: String
});

var Paste = mongoose.model('paste', pasteSchema);

module.exports = Paste