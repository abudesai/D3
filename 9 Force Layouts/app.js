// Data
var data            =   {
    nodes:              [
        { name: "Jack" }, { name: "Bob" },
        { name: "Bill" }, { name: "Jan" },
        { name: "Edward" }, { name: "Sara" },
        { name: "Nikki" }, { name: "Ronald" },
        { name: "Jerry" }, { name: "Zac" }
    ],
    links:              [
        { source: 0, target: 1 }, { source: 0, target: 2 },
        { source: 0, target: 3 }, { source: 0, target: 4 },
        { source: 1, target: 5 }, { source: 2, target: 5 },
        { source: 2, target: 5 }, { source: 3, target: 4 },
        { source: 5, target: 8 }, { source: 5, target: 9 },
        { source: 6, target: 7 }, { source: 7, target: 8 },
        { source: 8, target: 9 }
    ]
};

//Width and height
var chart_width     =   600;
var chart_height    =   600;
var colors          =   d3.scaleOrdinal( d3.schemeCategory10 );

// Force Layout
var force           =   d3.forceSimulation( data.nodes )
    .force( 'charge' , d3.forceManyBody().strength( -200 ) ) //this attracts(+)/repels(-) the nodes away based on some force
    .force( 'link', d3.forceLink( data.links ) ) //this links the nodes
    .force( 'center', d3.forceCenter()
                        .x( chart_width / 2)
                        .y( chart_height / 2)
    );   //this will add an invisible gravitational pull to the center

/*
d3.forceCollide()     
    prevents elements from overlapping each other
    chain the radius() function to set the radius of the elements

d3.forceX() and d3.forceY()
    attracts your data to a certain X or Y coordinates on your visualization
    chain the x() and y() functions to set the coordinates
    differs from forceCenter in that it will only attract to one axis as opposed to both axes
    use to create groups of nodes that stay in different areas

d3.forcelink()
    sets a fixed distance between each piece of data
    requires that you pass in the links between each piece of data
    

*/
// SVG
var svg             =   d3.select("#chart")
    .append( "svg" )
    .attr( "width", chart_width )
    .attr( "height", chart_height );

// Lines AKA Links
var lines           =   svg.selectAll("line")
    .data(data.links)
    .enter()
    .append( "line" )
    .style( "stroke", "#24292e" )
    .style( "stroke-width", 2 );

// Nodes
var nodes           =   svg.selectAll("circle")
    .data(data.nodes)
    .enter()
    .append( "circle" )
    .attr( "r", 20 )
    .style( "fill", function( d, i ) {
        return colors(i);
    });

// Tooltip
nodes.append("title")
    .text(function( d ) {
        return d.name;
    });


force.on( 'tick', ()=>{
    lines.attr( "x1", (d) => { return d.source.x; })
        .attr( "y1", (d) => { return d.source.y; })
        .attr( "x2", (d) => { return d.target.x; })
        .attr( "y2", (d) => { return d.target.y; })

    nodes.attr( "cx", d => { return d.x; })
        .attr( "cy", d => { return d.y; })

});