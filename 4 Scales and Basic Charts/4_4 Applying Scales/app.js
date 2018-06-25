

// create data for the scatter plot
var data            =   [
    [ 400, 200 ],
    [ 210,140 ],
    [ 722,300 ],
    [ 70,160 ],
    [ 250,50 ],
    [ 110,280 ],
    [ 699,225 ],
    [ 90, 220 ]
];

// --------------------------------------------------------

// Chart size parameters
var chart_width     =   800;
var chart_height    =   400;
var padding			= 	50;

// --------------------------------------------------------

// Create the SVG
var svg 			= d3.select( "#chart")
	.append( 'svg' )
	.attr("width", chart_width)
	.attr("height", chart_height)

// --------------------------------------------------------

// Create Scales
const x_scale 		= d3.scaleLinear()
	//accessor function for max value
	.domain([0, d3.max(data, (d) => {
		return d[0];
	})])
	.range([padding, chart_width - padding])
	.nice();		//domain turns into 0.4, 0.1, etc (more readable)

const y_scale 		= d3.scaleLinear()
	//accessor function for max value
	.domain([0, d3.max(data, (d) => {
		return d[1];
	})])
	.rangeRound([chart_height - padding, padding]);	//rangeRound returns a integerized range value

const r_scale		= d3.scaleLinear()
	.domain([0, d3.max(data, (d) => {
		return d[1];
	})])
	.range([5, 30]);

const a_scale		= d3.scaleSqrt()
	.domain([0, d3.max(data, (d) => {
		return d[1];
	})])
	.range([0, 25]);
	
// --------------------------------------------------------
// more functions related to scales
/*
 nice() 			: domain turns into 0.4, 0.1, etc (more readable)
 rangeRound()		: rangeRound (used instead of range()) returns a integerized range value
 clamp(true)		: applies bounds on the range. Values on domain outside 
					  the given domain range will return the min / max values on range
*/
// --------------------------------------------------------
/*
DIFFERENT SCALES
scaleSqrt() 		: scales data using square root
scalePow()			: uses the power of another number
scaleLog()			: scales data using logarithm
scaleQuantize()		: scales data like scaleLinear() but used for discrete values
scaleQuantile()		: scales data like scaleQuantize() except the domain gets effected
scaleOrdinal()		: used for categorical data that can be ordered
scaleTime()			: scales date and time
*/

// --------------------------------------------------------
// Append circles as scatter points
svg.selectAll("circle")
	.data( data )
	.enter()
	.append( "circle" )
	.attr("cx", (d) => {
		return x_scale( d[0] );
	})
	.attr("cy", (d) => {
		return y_scale( d[1] ) ;
	})
	.attr("r", (d) => {
		return a_scale( d[1] );
	})
	.attr("fill", "#d1ab03");

// --------------------------------------------------------

// Add labels in the (x, y) format to each point
svg.selectAll( "text" )
	.data( data )
	.enter()
	.append( "text" )
	.text( (d) => {
		return "(" + d[0] + ", " + d[1] + ")"
		// return "(" + d.join(",")  + ")"
	})
	.attr("x", (d) => {
		return x_scale( d[0] );
	})
	.attr("y", (d) => {
		return y_scale( d[1] ) ;
	})

// --------------------------------------------------------