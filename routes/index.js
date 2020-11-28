var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', { 
        title: 'My Favorite Drama List', 
        length: 1 
    });
});

module.exports = router;
