
// Create an array of random numbers
var data            =   [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];

// console.log(data);

// --------------------------------------------------------------------------------
// define some parameters we will need
const chart_width 	= 800, 
	chart_height 	= 400, 
	bar_padding 	= 10, 
	padding			= 	50;

// Create svg element
var svg = d3.select( "#chart")
	.append("svg")
	.attr("width", chart_width)
	.attr("height", chart_height);

// ---------------------------------------------------------------------------------
// Create Scales 

const x_scale		= d3.scaleBand()
	.domain( d3.range( data.length ) )
	.rangeRound ( [0, chart_width] )
	.paddingInner( 0.1 );	//10%


const y_scale		= d3.scaleLinear()
	.domain( [0, d3.max(data)])
	.range([0, chart_height - padding]);


// ---------------------------------------------------------------------------------
// bind data and create bars using rectangles
svg.selectAll( "rect" )
	.data( data )
	.enter()
	.append("rect")
	.attr("x", (d, i) => {
		return x_scale( i );
	})
	.attr("y", (d) => {
		return (chart_height - y_scale(d) );
	})
	.attr("width", x_scale.bandwidth())		//bandwidth excludes padding between bars, so no need to adjust for padding
	.attr("height", (d) => {
		return y_scale(d);
	})
	.attr("fill", "#7ED26D");

// Create labels
svg.selectAll( "text" )
	.data(data)
	.enter()
	.append( "text" )
	.text ((d) => {
		return d;
	})
	.attr("x", (d, i) => {
		return x_scale(i) + x_scale.bandwidth()/2;
	})
	.attr("y", (d) => {
		return (chart_height - y_scale(d) + 15);
	});

// ---------------------------------------------------------------------------------

// Events to Reverse Elements in the Array Used in the Chart
d3.select( 'button' )
	.on('click', function(){

		data.reverse();	//reverses the array

		//update the rectangles used in the bar chart
		//only the bar height and y location need to change
		svg.selectAll( 'rect' )
			.data( data )
			.transition()				//https://github.com/d3/d3-transition	
			.delay( (d,i) => {
				return i / data.length * 1000;
			} )	
			.duration( 1000 )
			.ease( d3.easeQuadInOut )	//https://github.com/d3/d3-ease; https://bl.ocks.org/mbostock/248bac3b8e354a9103c4
			.attr("y", (d) => {
				return (chart_height - y_scale(d) );
			})
			.attr("height", (d) => {
				return y_scale(d);
			})

		// update the text values shown on the bars
		// The x,y coordinates and the values need to change
		svg.selectAll( "text" )
			.data(data)
			.transition()
			.delay( (d,i) => {
				return i / data.length * 1000;
			} )	
			.duration( 1000 )
			.ease( d3.easeQuadInOut )
			.text ((d) => {
				return d;
			})
			.attr("x", (d, i) => {
				return x_scale(i) + x_scale.bandwidth()/2;
			})
			.attr("y", (d) => {
				return (chart_height - y_scale(d) + 15);
			});

	})
