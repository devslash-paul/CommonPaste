var express = require('express');
var router = express.Router();
var Paste = require('../schema/paste.js')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'CommonPaste - A CommonMark paste bin'});
});

function extractDatabaseHeading(req) {
    var heading = req.body.data.substr(0, 70);
    heading = heading.replace(/ /g, "-");
    // If there's a new line then use that.
    var newLine = heading.indexOf("\n");
    if (newLine != -1) {
        heading = heading.substr(0, newLine);
    }
    heading = heading.toLowerCase();
    heading = heading.replace(/[^abcdefghijklmnopqrstuvwxyz-]/g, "");
    return heading;
}

function checkDuplicateKeys(paste, callback) {
    return "-" + Paste.count({
            year: paste.year, day: paste.day, month: paste.month,
            heading: new RegExp("^" + paste.heading + "(-\d+)?")
        }, function (err, count)
    {
        console.log("Count: " + count);
        if(count != 0)
            paste.heading += "-" + count

        callback(null, paste)
    })
}

/* Post to save the page */
router.post('/submit', function (req, res, next) {
    var x = new Date();

    var heading = extractDatabaseHeading(req);

    var paste = new Paste({
        text: req.body.data,
        css: req.body.codestyle,
        day: x.getDate(),
        month: x.getMonth() + 1,
        year: x.getYear() + 1900,
        heading: heading
    });

    checkDuplicateKeys(paste, function (err, result) {
            paste.save(function (err, doc) {
                if (err) return err

                res.redirect("/p/" + result.year + "/" + result.month + "/" + result.day + "/" + result.heading)
            })
        })


});

module.exports = router;
