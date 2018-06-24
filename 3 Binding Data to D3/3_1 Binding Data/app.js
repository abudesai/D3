
// Create an array to use in our example
var dataset = [10, 20, 30, 40, 50];

// Let's bind the data to p elements
// Note that there already are 2 p tags defined in the html document.
var el1 = d3.select( "body" )
	.selectAll( "p" )
	.data( dataset )
	.enter()
	.append("p")
	.text((d) => {
		return "Appended p tag bound to the number: " + d;
	})
	.attr("class", (d) => {
		return d > 35 ? 'not_underlined' : 'underlined';
	})
	.classed("special", (d) => {
		return d == 50;
	})
	.style("color", (d) => {
		return d > 35 ? 'red' : 'blue';
	});


//check the d3 returned element: It's an array of size 5 but first two items are empty because 
// they were taken by the existing p tags
console.log(el1);


// check all p tags (2 existing, and 3 new appended by d3). 
// You will note the first two, which were existing, do have the data bound to them
// but we weren't able to change their text attribute because d3 never grabbed hold of them
console.log(document.getElementsByTagName("p"));



// // You can bind to any html element. Let's use div here
// var el2 = d3.select( "body" )
// 	.selectAll( "div" )
// 	.data( dataset )
// 	.enter()
// 	.append("div")
// 	.text("Hello World");
// console.log(el2);