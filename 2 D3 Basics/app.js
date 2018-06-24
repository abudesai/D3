


var el = d3.select("body")
	.append("p")
	// .attr("class", "foo")
	// .attr("class", "bar")	//this replaces foo. Only one attr of a type can be applied through attr
	.classed("foo", true)
	.classed("bar", true)		//this doesn't replace foo. Both foo and bar are applied
	.text("Hello World")
	.style("color", "blue");

console.log(el);