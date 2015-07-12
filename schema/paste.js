var mongoose = require('mongoose');

var pasteSchema = mongoose.Schema({
    text: String
});

var Paste = mongoose.model('paste', pasteSchema);

module.exports = Paste