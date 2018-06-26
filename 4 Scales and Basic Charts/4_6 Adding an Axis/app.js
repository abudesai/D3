

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
// Create Axes

// First the x-axis
const x_axis		= d3.axisBottom(x_scale);
			// .tickValues( [0, 150, 300, 450, 600, 750] )
			// .ticks( 5 );

/*
// Another way to do the above:
const x_axis		= d3.axisBottom()
			.scale(x_scale);
*/

// Now append to the svg using the call() function
svg.append( 'g' )
	.attr( 'class', 'x-axis')
	.attr( 'transform', 
		'translate(0, ' + (chart_height - padding)  + ')' ) 	//this helps to move the axis to the bottom of the chart
	.call( x_axis );	//we have to chain functions. x_axis by itself is not a function, so we use call()


// Now, the y-axis
const y_axis		= d3.axisLeft(y_scale)
		.ticks(5)
		.tickFormat((d) => {
			return d + '%';
		});


svg.append( 'g' )
	.attr( 'class', 'y-axis')
	.attr( 'transform', 
		'translate(' + (padding)  + ',0)' )
	.call( y_axis );	

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
//appending the 'g' group helps because now the selectAll("text") doesn't select some existing text tags
//Without the 'g', the selection would have selected existing 'text' tags created when we appended the axis
//above
svg.append('g')	
	.selectAll( "text" )
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