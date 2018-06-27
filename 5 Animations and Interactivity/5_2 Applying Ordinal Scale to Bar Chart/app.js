
// Create an array of random numbers
var data            =   [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];

console.log(data);

// --------------------------------------------------------------------------------
// until now, we bound our data to regular html elements. Now let's bind to svg elements.

// define some parameters we will need
const chart_width = 800, chart_height = 400; 
const bar_padding = 10;
var padding			= 	50;

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