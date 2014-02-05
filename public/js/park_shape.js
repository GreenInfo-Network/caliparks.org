'use strict';

(function(window) {
  
  window.STMN = window.STMN || {};

  function ParkShape(rootSelector, shapeData, options) {

    options = options || {};

    options.canvasWidth  = 110,
    options.canvasWeight = 110,
    options.scale        = 600,
    options.fillColor    = "rgb(34, 17, 2)",
    options.dotLocation  = null,
    options.dotRadius    = 2,
    options.dotColor     = 'white'

    function init() {

      //
      // Fit postgres output into Feature collection
      // boilerplate
      //
      var geoJSON = {
          "type": "FeatureCollection",
          "features":[
              {
                  "type":"Feature",
                  "geometry":{
                      "type":"MultiPolygon",
                      "coordinates":shapeData.coordinates
                  },
                  "properties":{
                      "name" : "bar"
                  }
              }
          ]
      };


      var width = 300, height = 300, initialScale = 1000;

      //
      // Project the feature at a default scale
      //
        // create a first guess for the projection
        var center = d3.geo.centroid(geoJSON)
        var scale  = 150;
        var offset = [width/2, height/2];
        var projection = d3.geo.mercator().scale(scale).center(center)
            .translate(offset);

        // create the path
        var path = d3.geo.path().projection(projection);

        // using the path determine the bounds of the current map and use 
        // these to determine better values for the scale and translation
        var bounds  = path.bounds(geoJSON);
        var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
        var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
        var scale   = (hscale < vscale) ? hscale : vscale;
        var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
                          height - (bounds[0][1] + bounds[1][1])/2];

        // new projection
        projection = d3.geo.mercator().center(center)
          .scale(scale-1500).translate(offset);
        path = path.projection(projection);

        var vis = d3.select(rootSelector).append("svg")
        .attr("width", width).attr("height", height)

        // add a rectangle to see the bound of the svg
        vis.append("rect").attr('width', width).attr('height', height)
          .style('fill', 'none');

        vis.selectAll("path").data(geoJSON.features).enter().append("path")
          .attr("d", path)
          .style("fill", "rgb(145, 137, 106)").attr("stroke", "rgb(145, 137, 106)");
    }

    return {
      init : init
    }

  }

  STMN.ParkShape = ParkShape;

}(window));