var express = require('express');
var Hashids = require('hashids');
var router = express.Router();
var Paste = require('../schema/paste.js')

var hashids = new Hashids("this is my salt")

/* GET home page. */
router.get('/:year/:month/:day/:title', function(req, res, next) {

    Paste.findOne({year:parseInt(req.params.year),
                month:parseInt(req.params.month),
                day:parseInt(req.params.day),
                heading:req.params.title},

        function(err, doc){

            if(err) return err

            doc.title = "CommonPaste";
            doc.shorturl = req.get("host") + "/s/" + hashids.encode(doc.createdOn.getTime());
            res.render("result", doc)
        }
    )
});

module.exports = router;
