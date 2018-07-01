// Data
var data            =   [
    { pigeons: 6, doves: 8, eagles: 15 },
    { pigeons: 9, doves: 15, eagles: 5 },
    { pigeons: 11, doves: 13, eagles: 14 },
    { pigeons: 15, doves: 4, eagles: 20 },
    { pigeons: 22, doves: 25, eagles: 23 }
];

var chart_width     =   800;
var chart_height    =   400;
var padding 		= 	20;
var color           =   d3.scaleOrdinal( d3.schemeCategory10 );


// Stacked Layout
var stack 			=	d3.stack()
	.keys([
		'pigeons', 'doves', 'eagles'
		]);

var stack_data	 	= 	stack( data );


// Scales
// X-scale
var x_scale			= 	d3.scaleBand()
	.domain( d3.range(data.length))
	.range( [0, chart_width])
	.paddingInner(0.05);

var y_scale			=	d3.scaleLinear()
	.domain([
		0, 
		d3.max( data, function(d) {
			return d.pigeons + d.doves + d.eagles;
		})
	])
	.range([chart_height , 0 + padding]);



// Create SVG Element
var svg             =   d3.select("#chart")
    .append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height);


// Groups
var	groups 			= 	svg.selectAll( 'g' )
	.data( stack_data )
	.enter()
	.append( 'g' )
	.style( 'fill', (d, i) => {
		return color(i);
	});

// Rectangles
// groups.selectAll( 'rect' )
// 	.data((d)=> {
// 		return d;
// 	})
// 	.enter()
// 	.append( 'rect' )
// 	.attr( "x", function( d,i ){
// 		return x_scale(i);
// 	})
// 	.attr( "y", function(d){
// 		return y_scale(d[1]);
// 	})
// 	.attr( "height", function(d,i){
// 		return y_scale(d[0]) - y_scale(d[1]);
// 	})
// 	.attr( "width", x_scale.bandwidth() );
	
	
	

var rects_enter = groups.selectAll( 'rect' )
	.data((d)=> {
		return d;
	})
	.enter();

rects_enter.append( 'rect' )
	.attr( "x", function( d,i ){
		return x_scale(i);
	})
	.attr( "y", function(d){
		return y_scale(d[1]);
	})
	.attr( "height", function(d,i){
		return y_scale(d[0]) - y_scale(d[1]);
	})
	.attr( "width", x_scale.bandwidth() );

rects_enter.append("text")
	.attr( "y", function(d){
		return 0.5 * padding + y_scale(d[1]) + 0.5 * (y_scale(d[0]) - y_scale(d[1]));
	})
	.attr( "x", function( d,i ){
		return x_scale(i) + x_scale.bandwidth() / 2;
	})
	.style("text-anchor", "middle")
	.style("font-size", "20px")
	.style("color", "black")
	.style("fill", "ffffff")
	.text(function(d,i) { 
		const val = d[1] - d[0]; 
		// console.log("val:", val);
		// return "" + d.key + ": " + val; 
		return val;
	}); 
