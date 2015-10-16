'use strict';

import express from 'express';
import instagram from './data/instagram.js';
import path from 'path';
import config from '../config.js';
import file from './utils/file.js';

const router = express.Router();

module.exports = function(app) {

  app.get('/', function(req, res) {
    console.log('....index....');

    var headerImages = [];
    var recentParks = [];
    file.glob('images/header/*.jpg', {cwd: path.join(__dirname,'../../../static/')}, function(err, files){
      if (files && files.length) headerImages = files;
      instagram.getRecentParks({}, function(err, results){
        if (results) recentParks = results;
        res.render(req.url, {
          title: config.app.name,
          view: 'home',
          viewdata: {
            header: headerImages,
            recentParks: recentParks
          }
        });
      });
    });
  });

  app.get('/wander', function(req, res, next) {
    console.log('.....wander....');
    res.render(req.url, {
      title: config.app.name,
      view: 'wander',
      viewdata: {}
    });
  });

  app.get('/park', function(req, res, next){
    res.redirect('/');
  });

  app.get('/park/:id(\\d{3,6})', function(req, res, next) {
    res.render(req.url, {
      title: config.app.name,
      view: 'park',
      viewdata: {},
      others: 'hello'
    });
  });

  app.get('/explore', function(req, res, next) {
    console.log('.....explore....');
    res.render(req.url, {
      title: config.app.name,
      view: 'explore',
      viewdata: {}
    });
  });

  app.get('/discover', function(req, res, next) {
    res.render(req.url, {
      title: config.app.name,
      view: 'discover',
      viewdata: {}
    });
  });
};