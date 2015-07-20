var express = require('express');
var router = express.Router();
var Paste = require('../schema/paste.js');
var bcrypt = require('bcrypt');

function extractDatabaseHeading(req) {
    var heading = req.body.data.substr(0, 70);

    // If there's a new line then use that.
    var newLine = heading.indexOf("\n");
    if (newLine != -1) {
        heading = heading.substr(0, newLine);
    }
    heading = heading.toLowerCase();
    heading = heading.replace(/[^abcdefghijklmnopqrstuvwxyz ]/g, "").trim();
    heading = heading.replace(/ /g, "-");
    heading = heading.replace(/-+/g, "-");
    return heading;
}

function checkDuplicateKeys(paste, callback) {
    return "-" + Paste.count({
            year: paste.year, day: paste.day, month: paste.month,
            heading: new RegExp("^" + paste.heading + "(-\d+)?")
        }, function (err, count) {
            if (count != 0)
                paste.heading += "-" + count

            callback(null, paste)
        })
}

/* Post to save the page */
router.post('/submit', function (req, res, next) {
    var x = new Date();

    var heading = extractDatabaseHeading(req);

    //If we have a password then we should save it
    var paste = new Paste({
        text: req.body.data,
        css: req.body.codestyle,
        day: x.getDate(),
        month: x.getMonth() + 1,
        year: x.getYear() + 1900,
        heading: heading,
    });

    if (req.body.password && req.body.id) {
        // Get by the ID and update the text after
        // checking the password.

        // get the password hash first
        Paste.findById(req.body.id, function (err, doc) {
            // If there's no password then we can't save
            if (!doc.password) {
                res.send(JSON.stringify({success: false}));
            }

            // we do have a password. So lets compare
            bcrypt.compare(req.body.password, doc.password, function (err, hres) {
                if (hres) {
                    doc.text = req.body.data;
                    res.json({
                        success: true,
                        location: "/p/" + doc.year + "/" + doc.month + "/" + doc.day + "/" + doc.heading
                    });

                    doc.save()

                } else {
                    res.send(JSON.stringify({success: false}))
                }
            });
        });

    }
    else {
        // We should create something completely new
        checkDuplicateKeys(paste, function (err, result) {
            paste.save(function (err, doc) {
                if (err) return err

                res.redirect("/p/" + result.year + "/" + result.month + "/" + result.day + "/" + result.heading)

                // If these was a password. Lets add it now
                if (req.body.editpassword && req.body.editpassword.length> 0) {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body.editpassword, salt, function (err, hash) {
                            // Store hash in your password DB.
                            paste.password = hash;
                            paste.save()
                        });
                    });
                }
            })
        })
    }


});

/* GET home page. */
router.get('/:id?', function (req, res, next) {
    var title = 'CommonPaste - A CommonMark paste bin';

    if (req.params.id) {
        // Then we can go get the existing one
        Paste.findById(req.params.id, function (err, doc) {
            if (err) return err;

            doc.title = title;
            res.render('index', doc);
        })
    }
    else {
        res.render('index', {title: title});
    }
});

module.exports = router;
