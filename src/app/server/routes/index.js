'use strict';

import express from 'express';
import instagram from '../data/instagram';
import path from 'path';
import config from '../../config';
import file from '../utils/file';

var router = express.Router();

router.get('/', function(req, res) {
  var headerImages = [];
  var recentParks = [];
  file.glob('images/header/*.jpg', {cwd: path.join(__dirname,'../../../../static/')}, function(err, files){
    if (files && files.length) headerImages = files;
    instagram.getRecentParks({}, function(err, results){
      if (results) recentParks = results;
      res.render(req.url, {
        title: config.app.name,
        viewdata: {
          header: headerImages,
          recentParks: recentParks
        }
      });
    });
  });
});


module.exports = router;