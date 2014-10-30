"use strict";

var express = require("express");

var models = require("../models"),
    Park = models.Park;

var app = module.exports = express();

app.get("/:id(\\d+)", function(req, res, next) {
  console.log("Looking for", req.params.id);
  return Park.find({
    where: {
      id: req.params.id,
    },
    include: [models.FlickrPhoto]
  }).done(function(err, park) {
    if (err) {
      return next(err);
    }

    console.log("%j", park.FlickrPhotos[0]);

    var templateData = {
      park: park,
      hasAPI: true,
      layout: "responsive2",
      view: "park"
    };

    return res.render("park", templateData);
  });
});
