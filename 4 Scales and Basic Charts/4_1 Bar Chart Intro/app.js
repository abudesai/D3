
// Create an array of random numbers
var data            =   [];
for( var i = 0; i < 20; i++){
	// data.push(Math.floor(Math.random() * 50));
	data.push(Math.floor(d3.randomUniform(1,50)()))
}
console.log(data);

// go to github.com/d3/d3-random for more info on using d3 to generate random samples of data

// --------------------------------------------------------------------------------

// // Let's bind the data to div elements
// var el = d3.select( "#chart" )
// 	.selectAll( "div" )
// 	.data( data )
// 	.enter()
// 	.append("div")
// 	.classed("bar", true)
// 	.style("height", (d) => {
// 		var height = 5 * d;
// 		// console.log(height);
// 		return height +"px";
// 	});
// // since we created bars using divs, they go bottom to top unlike rects which will go top to bottom

// --------------------------------------------------------------------------------
// until now, we bound our data to regular html elements. Now let's bind to svg elements.

// define some parameters we will need
const chart_width = 800, chart_height = 400; 
const bar_padding = 10;

// Create svg element
var svg = d3.select( "#chart")
	.append("svg")
	.attr("width", chart_width)
	.attr("height", chart_height);

// bind data and create bars using rectangles
svg.selectAll( "rect" )
	.data( data )
	.enter()
	.append("rect")
	.attr("x", (d, i) => {
		return i * (chart_width / data.length);
	})
	.attr("y", (d) => {
		return ( chart_height - 5 * d );
	})
	.attr("width", chart_width / data.length - bar_padding)
	.attr("height", (d) => {
		return (5 *d);
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
		return i * (chart_width / data.length) + 
		(chart_width / data.length - bar_padding) / 2;
	})
	.attr("y", (d) => {
		return ( chart_height - 5 * d + 15);
	});