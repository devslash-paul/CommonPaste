var express = require('express');
var router = express.Router();
var Paste = require('../schema/paste.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit', function(req, res, next) {
  var paste = new Paste({
    text: req.body.data
  });

  paste.save(function(err, doc){
    if(err) return err

    res.redirect("/paste/"+doc._id)
  })
});

module.exports = router;
