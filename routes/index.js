var express = require('express');
var router = express.Router();
var request = require('request');
var proxy_config = require('../modules/proxy_config');

router.get('/Get', function(req, res, next) {
    res.redirect(proxy_config.get_master_url())
});

module.exports = router;
