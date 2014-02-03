'use strict';

(function(window) {

  window.STMN = {};

  function displayUsCa(rootSelector, options) {

    options = options || {
      //defaults
      canvasWidth  : 110,
      canvasHeight : 150,
      scale         : 600,
      fillColor    : "rgb(34, 17, 2)",
      dotLocation  : null,
      dotRadius    : 2,
      dotColor     : 'white'
    };

    var svgUsCa = d3.select(rootSelector).append("svg")
        .attr("width", options.canvasWidth)
        .attr("height", options.canvasHeight)
        .attr("viewBox", [0, 0, options.canvasWidth, options.canvasHeight])
        .attr("preserveAspectRatio", "meet xMidYMid");

    var UsCa; // background shape

    var projectionUsCa = d3.geo.albers()
        .center([0,36.5]) // For statewide view
        .rotate([119, 0]) // For statewide view
        .parallels([32,40])
        .scale(options.scale)
        .translate([options.canvasWidth / 2, options.canvasHeight / 2]);

    var pathUsCa = d3.geo.path().projection(projectionUsCa);

    d3.json("/data/gadm_california.topojson", function(error, units) {

        UsCa = svgUsCa.append("g").selectAll("path")
            .data(topojson.feature(units, units.objects.gadm_california).features)
          .enter().append("path")
            .attr("d", pathUsCa)
            .attr("fill", options.fillColor)
            .attr("stroke", "rgba(255,255,255,.4)");

        if (options.dotLocation) {
          var coordinates = projectionUsCa(options.dotLocation);
          svgUsCa.append('svg:circle')
              .attr('cx', coordinates[0])
              .attr('cy', coordinates[1])
              .attr('r', options.dotRadius)
              .attr("fill", options.dotColor)
              .attr("stroke", "rgba(0,0,0,.2)");
        }

    });

  }

	function displayPark(rootSelector, shapeData, options) {

		options = options || {
			//defaults
			canvasWidth  : 110,
			canvasWeight : 110,
			scale         : 600,
			fillColor    : "rgb(34, 17, 2)",
			dotLocation  : null,
			dotRadius    : 2,
			dotColor     : 'white'
		};


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

      var vis = d3.select("#park-shape").append("svg")
      .attr("width", width).attr("height", height)

      // add a rectangle to see the bound of the svg
      vis.append("rect").attr('width', width).attr('height', height)
        .style('fill', 'none');

      vis.selectAll("path").data(geoJSON.features).enter().append("path")
        .attr("d", path)
        .style("fill", "rgb(145, 137, 106)")


	}

  function initView(data) {

    if (data.UsCaShape.display) {
      displayUsCa(
        data.UsCaShape.rootSelector, 
        data.UsCaShape.options
      );
    }

    displayPark(
      data.parkShape.rootSelector, 
      data.parkShape.shapeData, 
      data.parkShape.options
    );

  }

  //Public interface
  STMN.initView = initView;

}(window));