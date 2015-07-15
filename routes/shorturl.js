var express = require('express');
var Hashids = require('hashids');
var router = express.Router();
var Paste = require('../schema/paste.js')

var hashids = new Hashids("this is my salt")

/* GET home page. */
router.get('/:id', function(req, res, next) {

    Paste.findOne({createdOn: hashids.decode(req.params.id)},
        function(err, result){
            if(err) return err

            res.redirect("/p/" + result.year + "/" + result.month + "/" + result.day + "/" + result.heading)
        }
    )
});

module.exports = router;
