var express = require('express');
var router = express.Router();
var Paste = require('../schema/paste.js')

/* GET home page. */
router.get('/:year/:month/:day/:title', function(req, res, next) {

    Paste.findOne({year:parseInt(req.params.year),
                month:parseInt(req.params.month),
                day:parseInt(req.params.day),
                heading:req.params.title},

        function(err, doc){

            if(err) return err


            doc.title = "CommonPaste";
            res.render("result", doc)
        }
    )
});

module.exports = router;
