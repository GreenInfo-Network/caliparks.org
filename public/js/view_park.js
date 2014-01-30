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
		var initalProjection = d3.geo.albers()
					.center(options.centroid)
					.scale(initialScale)
					.rotate(30,0)
					.translate([width / 2, height / 2]);

		var initialPath = d3.geo.path().projection(initalProjection);

		var bounds     = initialPath.bounds(geoJSON),
		    hscale     = initialScale*width  / (bounds[1][0] - bounds[0][0]),
		    vscale     = initialScale*height / (bounds[1][1] - bounds[0][1]),
		    proj_scale = (hscale < vscale) ? hscale : vscale,
		    offset     = [(width) - (bounds[0][0] + bounds[1][0])/2, (height) - (bounds[0][1] + bounds[1][1])/2];

		//
		// Now, project the feature to fit the display width using
		// It's bounding box
		//
		var secondaryProjection = d3.geo.albers()
					.center(options.centroid)
					.scale(proj_scale-1500)
					.rotate(30,0)
					.translate(offset);

		var secondaryPath = d3.geo.path().projection(secondaryProjection);

		var svg = d3.select(rootSelector).append("svg")
								.attr("width", width)
								.attr("height", height);

		var d = svg.selectAll("path")
								.data(geoJSON.features).enter().append("path")
								.attr("d",secondaryPath)
								.attr("fill",'#999');


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