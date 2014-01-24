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

    var svg_cali = d3.select(root_selector).append("svg")
        .attr("width", options.canvas_width)
        .attr("height", options.canvas_height)
        .attr("viewBox", [0, 0, options.canvas_width, options.canvas_height])
        .attr("preserveAspectRatio", "meet xMidYMid");

    var california; // background shape

    // For resizing shapes to be similar sizes

    // Projection settings
    // modifying a projection from http://bost.ocks.org/mike/map/.
    var projection_cali = d3.geo.albers()
        .center([0,36.5]) // For statewide view
        .rotate([119, 0]) // For statewide view
        .parallels([32,40])
        .scale(options.scale)
        .translate([options.canvas_width / 2, options.canvas_height / 2]);

    var path_cali = d3.geo.path().projection(projection_cali);

    d3.json("/data/gadm_california.topojson", function(error, units) {

        california = svg_cali.append("g").selectAll("path")
            .data(topojson.feature(units, units.objects.gadm_california).features)
          .enter().append("path")
            .attr("d", path_cali)
            .attr("fill", options.fill_color)
            .attr("stroke", "rgba(255,255,255,.2)");

        if (options.dot_location) {
          var coordinates = projection_cali(options.dot_location);
          svg_cali.append('svg:circle')
              .attr('cx', coordinates[0])
              .attr('cy', coordinates[1])
              .attr('r', options.dot_radius)
              .attr("fill", options.dot_color)
              .attr("stroke", "rgba(0,0,0,.2)");
        }

    });

  }

  function displayPark(root_selector, shape_data, options) {

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



var geoJSON = {
    "type": "FeatureCollection",
    "features":[
        {
            "type":"Feature",
            "geometry":{
                "type":"MultiPolygon",
                "coordinates":shape_data.coordinates
            },
            "properties":{
                "foo" : "bar"
            }
        }
    ]
}

    geoJSON.features.geometry = shape_data;


var width = 300, height = 300;

var projection = d3.geo.albers()
	.center(options.centroid)
    .scale(Math.max(Math.abs(options.bbox[0][1] - options.bbox[1][1]), Math.abs(options.bbox[0][0] - options.bbox[1][0]))*300000000)
    .rotate(30,0)
    .translate([width / 2, height / 2]);

    var path = d3.geo.path().projection(projection);

    

//Defaults to albersUsa Projection. You might want to set a different one

//Create the svg to render the polygon inside of
var svg = d3.select(root_selector).append("svg")
    .attr("width", width)
    .attr("height", height);
//Bind the geoJSON the path elements in the svg
//Use the enter selection (new elements) and draw the paths using the geo path generator
var d = svg.selectAll("path")
    .data(geoJSON.features).enter().append("path")
    .attr("d",path)
    .attr("fill",'#999');
//Note that when you bind new data, you will be changing existing path elements
//So you would also need to do a exit and modify existing paths

  }

  function initView(data) {

    if (data.california_shape.display) {
      displayCalifornia(
        data.california_shape.root_selector, 
        data.california_shape.options
      );
    }

    displayPark(
      data.park_shape.root_selector, 
      data.park_shape.shape_data, 
      data.park_shape.options
    );

  }

  //Public interface
  STMN.initView = initView;

}(window));