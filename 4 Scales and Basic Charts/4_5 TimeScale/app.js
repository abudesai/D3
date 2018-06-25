

// create data for the scatter plot
var data            =   [
   {date: '07/01/2017', num: 20},
   {date: '07/02/2017', num: 37},
   {date: '07/03/2017', num: 25},
   {date: '07/04/2017', num: 45},
   {date: '07/05/2017', num: 23},
   {date: '07/06/2017', num: 33},
   {date: '07/07/2017', num: 49},
   {date: '07/08/2017', num: 40},
   {date: '07/09/2017', num: 36},
   {date: '07/10/2017', num: 27},
];

console.log('Original data:', data)

// --------------------------------------------------------
// To parse the date field in the data

var time_parse 		= d3.timeParse( '%m/%d/%Y' );
var time_format 	= d3.timeFormat( '%b %e' )

//check https://github.com/d3/d3-time-format for more details on timeParse() and timeFormat() functions 

console.log("Testing parsing of '01/12/2018': ", time_parse('01/12/2018'));
//returns: 		Testing parsing of 01/12/2018:  Fri Jan 12 2018 00:00:00 GMT-0800 (Pacific Standard Time)

// date string has to be in the given format, otherwise function will return null
console.log("Testing parsing of '33': ", time_parse('33'));
//returns: 		Testing parsing of '33':  null


// parse the dates in the given data variable
data.map((d,i) => {
	d.date = time_parse(d.date);
	return d;
});
console.log('Date parsed data:', data)

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
const x_scale 		= d3.scaleTime()
	//accessor function for max value
	.domain([
		d3.min(data, (d) => {
			return d.date;
		}), 
		d3.max(data, (d) => {
			return d.date;
		})
	])
	.range([padding, chart_width - padding]);

const y_scale 		= d3.scaleLinear()
	//accessor function for max value
	.domain([0, d3.max(data, (d) => {
		return d.num;
	})])
	.range([chart_height - padding, padding]);	//rangeRound returns a integerized range value

const a_scale		= d3.scaleSqrt()
	.domain([0, d3.max(data, (d) => {
		return d.num;
	})])
	.range([0, 25]);
	
// --------------------------------------------------------
// Append circles as scatter points
svg.selectAll("circle")
	.data( data )
	.enter()
	.append( "circle" )
	.attr("cx", (d) => {
		return x_scale( d.date );
	})
	.attr("cy", (d) => {
		return y_scale( d.num ) ;
	})
	.attr("r", (d) => {
		return a_scale( d.num );
	})
	.attr("fill", "#d1ab03");

// --------------------------------------------------------

// Add labels to each point
svg.selectAll( "text" )
	.data( data )
	.enter()
	.append( "text" )
	.text( (d) => {
		return time_format(d.date);
	})
	.attr("x", (d) => {
		return x_scale( d.date );
	})
	.attr("y", (d) => {
		return y_scale( d.num ) ;
	})

// --------------------------------------------------------