

// Loading data from a csv format file
d3.csv("data.csv", (data) => {
		console.log("csv data:", data);
		// generate(data.columns);
	})


// Loading data from json format file
d3.json("data.json", (data) => {
		console.log("json data:", data);
		generate(data);
	})


//Do something with the data: here bind to p tags and add text
function generate(dataset) {
	
	console.log("Data inside the generate function:", dataset);

	// Let's bind the data to p elements
	var el1 = d3.select( "body" )
		.selectAll( "p" )
		.data( dataset )
		.enter()
		.append("p")
		.text((d) => {
			return "Appended p tag bound to the number: " + d;
		});
}

