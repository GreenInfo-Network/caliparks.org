// convert data directory into a web layout

var fs = require("fs"),
    util = require("util"),
    async = require("async");

var jsdom = require("jsdom").jsdom,
    d3 = require("d3");

(function(baseDir) {


  // var done = function(err, window) {

    fs.readdir(baseDir, function(err, files) {
      
      if (err) throw err;
      
      // var imgs = files.map(function(file) {
      files.forEach(function(file) {

        // jsdom.env({
        //   html: "<html><body></body></html>",
        //   scripts: ["http://d3js.org/d3.v3.min.js"],
        //   done: function(err, window) {

          var document = jsdom("<html><head></head><body></body></html>"),
              window = document.createWindow();

          var contents = require("./" + baseDir + file);

          // return contents.map(function(p) {
          var imgs = contents.map(function(p) {

            // var img = util.format("<img src='http://farm%s.staticflickr.com/%s/%s_%s_s.jpg'>", p.farm, p.server, p.id, p.secret);
            var url = util.format("http://farm%s.staticflickr.com/%s/%s_%s_s.jpg", p.farm, p.server, p.id, p.secret);

            // return img;
            return url;

          // }).join("\n");
          });

        // }).join("\n");
        // });

          var body = d3.select(document).select("body");

          body.selectAll("img")
            .data(imgs)
          .enter().append("img")
            .style("width", "75px")
            .style("height", "75px")
            .attr("src", String);
        
          console.log(window.document.innerHTML);

          var galleryFile = file.replace(".json", ".html");
          fs.writeFile("gallery/" + galleryFile, window.document.innerHTML, function (err) {
            if (err) throw err;
            console.log("saved", galleryFile);
          });

        // console.log(imgs);

        // console.log(imgs.length);

        // }
      // });
      });

    });
  // };

}("data/"));