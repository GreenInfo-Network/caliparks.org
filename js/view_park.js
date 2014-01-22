'use strict';

(function(window) {

	window.STMN = {};

	function displayCalifornia(root_selector, options) {

		options = options || {
			//defaults
			canvas_width  : 110,
			canvas_height : 110,
			scale         : 600,
			fill_color    : "rgb(34, 17, 2)",
			dot_location  : null,
			dot_radius    : 2,
			dot_color     : 'white'
		};

		var svg = d3.select(root_selector).append("svg")
		    .attr("width", options.canvas_width)
		    .attr("height", options.canvas_height)
		    .attr("viewBox", [0, 0, options.canvas_width, options.canvas_height])
		    .attr("preserveAspectRatio", "meet xMidYMid");

		var california; // background shape

		// For resizing shapes to be similar sizes

		// Projection settings
		// modifying a projection from http://bost.ocks.org/mike/map/.
		var projection = d3.geo.albers()
		    .center([0,36.5]) // For statewide view
		    .rotate([119, 0]) // For statewide view
		    .parallels([32,40])
		    .scale(options.scale)
		    .translate([options.canvas_width / 2, options.canvas_height / 2]);

		var path = d3.geo.path().projection(projection);

		d3.json("/data/gadm_california.topojson", function(error, units) {

		    california = svg.append("g").selectAll("path")
		        .data(topojson.feature(units, units.objects.gadm_california).features)
		      .enter().append("path")
		        .attr("d", path)
		        .attr("fill", options.fill_color)
		        .attr("stroke", "rgba(255,255,255,.2)");

		    if (options.dot_location) {
		    	var coordinates = projection(options.dot_location);
		    	svg.append('svg:circle')
	        		.attr('cx', coordinates[0])
	        		.attr('cy', coordinates[1])
	        		.attr('r', options.dot_radius)
	        		.attr("fill", options.dot_color)
	        		.attr("stroke", "rgba(0,0,0,.2)");
		    }

		});

	}

	function initView(data) {

		if (data.california_shape.display) {
			displayCalifornia(data.california_shape.root_selector, data.california_shape.options);
		}

	}

	//Public interface
	STMN.initView = initView;

}(window));
