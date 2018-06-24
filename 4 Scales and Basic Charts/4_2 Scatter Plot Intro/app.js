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

// Chart size parameters
var chart_width     =   800;
var chart_height    =   400;


// Create the SVG
var svg 			= d3.select( "#chart")
	.append( 'svg' )
	.attr("width", chart_width)
	.attr("height", chart_height)

// Append circles as scatter points
svg.selectAll("circle")
	.data( data )
	.enter()
	.append( "circle" )
	.attr("cx", (d) => {
		return d[0];
	})
	.attr("cy", (d) => {
		return d[1];
	})
	.attr("r", (d) => {
		return d[1] / 10;
	})
	.attr("fill", "#d1ab03");

// Add labels
svg.selectAll( "text" )
	.data( data )
	.enter()
	.append( "text" )
	.text( (d) => {
		return "(" + d[0] + ", " + d[1] + ")"
		// return "(" + d.join(",")  + ")"
	})
	.attr("x", (d) => {
		return d[0];
	})
	.attr("y", (d) => {
		return d[1] - 10;
	})
