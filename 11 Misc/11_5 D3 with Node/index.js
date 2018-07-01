

var http					=	require('http');
var d3Node					= 	require('d3-node');

var d3n 					= 	new d3Node();


var app 					=	http.createServer((req, res) => {

	if ( req.url.indexOf( 'favicon.ico') != -1 ) {
		res.statusCode		=	404;
		return;
	}

	d3n.createSVG( 400, 400 )
		.append( 'circle' )
		.attr( 'cx', 200)
		.attr( 'cy', 200)
		.attr( 'r', 100);

	res.writeHead( 200, { //statusCode indicating success
		'Content-Type': 'image/svg+xml'
	} );	

	res.end( d3n.svgString() );
});


app.listen(3000);