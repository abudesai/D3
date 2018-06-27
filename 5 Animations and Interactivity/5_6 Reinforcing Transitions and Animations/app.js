

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
	.range([padding, chart_width - padding * 2])
	.nice();		//domain turns into 0.4, 0.1, etc (more readable)

const y_scale 		= d3.scaleLinear()
	//accessor function for max value
	.domain([0, d3.max(data, (d) => {
		return d[1];
	})])
	.rangeRound([chart_height - padding, padding]);	//rangeRound returns a integerized range value
// --------------------------------------------------------
// Create Clip-Path to clip the scatter plot appearing outside the plot
svg.append( 'clipPath' )
	.attr( 'id', 'plot-area-clip-path')
	.append( 'rect' )
	.attr( 'x', padding)
	.attr( 'y', padding)
	.attr( 'width', chart_width - padding * 2)
	.attr( 'height', chart_height - padding * 2)




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
svg.append('g')
	.attr( 'id', 'plot-area')
	.attr( 'clip-path', 'url(#plot-area-clip-path)')
	.selectAll("circle")
	.data( data )
	.enter()
	.append( "circle" )
	.attr("cx", (d) => {
		return x_scale( d[0] );
	})
	.attr("cy", (d) => {
		return y_scale( d[1] ) ;
	})
	.attr("r", 15)
	.attr("fill", "#d1ab03");

// --------------------------------------------------------


// --------------------------------------------------------
//Events

d3.select( 'button' )
	.on( 'click', function(){
		//Create random data
		data 				= []
		const max_num		= Math.random() * 1000;
		for( var i = 0; i < 8; i++) {
			var new_x = Math.floor( Math.random() * max_num	);
			var new_y = Math.floor( Math.random() * max_num	);
			data.push( [ new_x, new_y ] );
		}

		// Update Scales
		x_scale.domain( [0, d3.max(data, function(d){
			return d[0];
		})] );
		y_scale.domain( [0, d3.max(data, function(d){
			return d[1];
		})] );

		var colors = [
		'#F26D6D', '#1E6190', '#755939', '#D1AB03'
		]; 

		var color_index = Math.floor(
			Math.random() * colors.length
		);

		// Update data
		svg.selectAll( 'circle' )
			.data(data)
			.transition()
			.duration(1000)
			// .on( 'start', function(){
			// 	d3.select( this )
			// 		.attr('fill', '#F26D2D' );
			// 	console.log('transition started');
			// } )
			.attr("cx", (d) => {
				return x_scale( d[0] );
			})
			.attr("cy", (d) => {
				return y_scale( d[1] ) ;
			})
			.transition()
			.attr( 'fill', colors[color_index]);
			// .on( 'end', function(){
			// 	d3.select( this )
			// 		.attr('fill', colors[color_index] );
			// 	console.log('transition ended!');
			// })

		// Update Axes
		svg.select( '.x-axis')  //grabbing using the class name we had assigned
			.transition()
			.duration(1000)
			.call( x_axis );

		svg.select( '.y-axis')  //grabbing using the class name we had assigned
			.transition()
			.duration(1000)
			.call( y_axis );

	})