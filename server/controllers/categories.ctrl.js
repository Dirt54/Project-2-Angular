var express = require('express');
var procedures = require('../procedures/categories.proc');
var auth = require('../middleware/auth.mw');

var router = express.Router();




router.route("/")
.get(function(req, res) {
  procedures.allCategories()
    .then(function(categories) {
      res.send(categories);
    })
    .catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
});


module.exports = router;