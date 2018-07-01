// Width and height
var chart_width     =   800;
var chart_height    =   600;


var color			= 	d3.scaleQuantize().range([
'rgb(255,245,240)',
'rgb(254,224,210)',
'rgb(252,187,161)',
'rgb(252,146,114)',
'rgb(251,106,74)',
'rgb(239,59,44)',
'rgb(203,24,29)',
'rgb(165,15,21)',
'rgb(103,0,13)',
]); 
 
// Projection
var projection 		= 	d3.geoAlbersUsa()
	// .scale( [chart_width * 1] )
	// .translate( [chart_width/2, chart_height/2] );
	.translate([ 0, 0 ]);

var path			=	d3.geoPath( projection );
var defaultScale	=	0.5;



// Create SVG
var svg             =   d3.select("#chart")
    .append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height);

var zoom_map 		= 	d3.zoom()
	.scaleExtent( [ 0.1, 3.0 ] )
	.translateExtent( [		[ -1000, -500], [ 1000, 500] ] )
	.on( 'zoom', function(){

		// console.log( d3.event );	//check this out. note the returned k (scale), x, and y parameters
		// think of k as the z dimension

		var offset 		= 	[
			d3.event.transform.x, d3.event.transform.y
		];

		var scaleFactor =	d3.event.transform.k ;
		var scale 		= 	scaleFactor * 2000; 	//2000 is the default, we are scaling it with k value here

		// update the path with the offset
		projection.translate( offset )
			.scale( scale );

		// Update the svg
		svg.selectAll( 'path' )
			.transition()
			.duration(100)
			.attr( 'd', path);

		svg.selectAll( 'circle' )
			.transition()
			.duration(100)
			.attr ("cx", (d)=>{
				return projection([ d.lon, d.lat ])[0];
			})
			.attr ("cy", (d)=>{
				return projection([ d.lon, d.lat ])[1];
			})
	});


var	map 			= 	svg.append( 'g' )
	.attr( 'id', 'map' )
	.call( zoom_map )
	.call( 
			zoom_map.transform,
			d3.zoomIdentity
				.translate( chart_width/2, chart_height/2)
				.scale( defaultScale )
		);
	
	// .call( drag_map);

// we do this to cover the entire map. That way, when we drag anywhere in the map,
// we can have movement.  Otherwise, we would only be drag inside paths that
// are in the map. Dragging in empty regions won't do anything.
map.append( 'rect' )
	.attr( 'x', 0)
	.attr( 'y', 0)
	.attr( 'width', chart_width)
	.attr( 'height', chart_height)
	.attr( 'opacity', 0);


// Data

// load the actual data
d3.json( 'zombie-attacks.json' ).then( (zombie_data) => {
	color.domain([
		d3.min( zombie_data, (d)=>{
			return d.num;
		}), 
		d3.max( zombie_data, (d)=>{
			return d.num;
		})
	])

	// load map data
	d3.json( 'us.json').then(( us_data )=>{

		// loop through both datasets
		us_data.features.forEach( (us_e, us_i) => {
			zombie_data.forEach( (z_e, z_i) => {
				if (us_e.properties.name !== z_e.state) {
					return null;
				}
				// add the zombie attack number to the specific state in the map data
				us_data.features[us_i].properties.num = parseFloat(z_e.num);
			})
		})

		console.log(us_data);

		map.selectAll( 'path' )
			.data( us_data.features )
			.enter()
			.append( 'path' )
			.attr( 'd', path)
			.attr( 'fill', (d) => {
				var num = d.properties.num;
				return num ? color(num) : '#ddd';
				// return color(num);
			} )
			.attr( 'stroke', '#fff' )
			.attr( 'stroke-width', 1);

		draw_cities();
	})
})


function draw_cities(){
	d3.json( "us-cities.json")
	.then( (city_data) => {		

		var r_scale 		= 	d3.scaleSqrt()
			.domain( [
				d3.min( city_data, (d)=>{
					return parseInt(d.population);
				}), 
				d3.max( city_data, (d)=>{
					return parseInt(d.population);
				})
			])
			.range([5, 20]);

		map.selectAll( "circle" )
			.data( city_data )
			.enter()
			.append( "circle" )
			.style( "fill", "#FFB600" )
			.style( "opacity", 0.8)
			.attr ("cx", (d)=>{
				return projection([ d.lon, d.lat ])[0];
			})
			.attr ("cy", (d)=>{
				return projection([ d.lon, d.lat ])[1];
			})
			.attr("r", (d)=>{
				var r = parseInt( d.population) ;
				return r_scale( parseInt( d.population) );   
			})
			.append( 'title' )
			.text( (d) =>{
				
				var population_str = d.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				var title = d.city + ": " + population_str;
				// console.log(title)
				return title;
			});


	})
}

// pan event listener
d3.selectAll( '#buttons button')
	.on( "click", function(){

		// var offset 		= 	projection.translate();	//returns the current x,y coordinates of the projection
		// console.log('current offset:', offset);

		var distance 	= 	100;		//unit distance to move the map every time the pan button is clicked
		var direction 	=	d3.select( this )
			.attr( 'class');

		console.log('direction', direction);

		var pan_arr = ['up', 'down', 'left', 'right'];
		var zoom_arr = [ 'in', 'out'];
		

		// if panning
		if ( pan_arr.includes(direction) ){
			
			var dx 			=	0;
			var dy 			=	0;
			// Get the x or y offset coordinate
			if (direction == "up") {
				dy			+=	distance;
			} else if (direction == "down") {
				dy			-=	distance;
			} else if (direction == "left") {
				dx			+=	distance;			
			} else if (direction == "right") {
				dx			-=	distance;		
			}
			console.log('dx', dx, " dy", dy);

			map.transition()
				.duration( 100 )
				.call( zoom_map.translateBy, dx, dy)		

		} else if ( zoom_arr.includes(direction) ){

			var scaleFactor		= 	1;
		    if( direction === "in" ){
		        scaleFactor      =  1.25;
		    }else if(direction === "out"){
		        scaleFactor       =  0.75;
		    }

		    map.transition()
		    	.duration( 100 )
		        .call(zoom_map.scaleBy, scaleFactor);

		} else if (direction == 'home') {

			map.call( 
					zoom_map.transform,
					d3.zoomIdentity
						.translate( chart_width/2, chart_height/2)
						.scale( defaultScale )
				);
			// console.log('k:', projection())
		}

		
	})