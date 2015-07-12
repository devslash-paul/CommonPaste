var express = require('express');
var router = express.Router();
var Paste = require('../schema/paste.js')

/* GET home page. */
router.get('/:id', function(req, res, next) {
    Paste.findById(req.params.id, function(err, doc){
        if(err) return err

        doc.title = "CommonPaste";
        res.render("result", doc)
    })
});

module.exports = router;
