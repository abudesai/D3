

var data            =   [6,20,21,14,2,30,7,16,25,5,11,28,10,26,9];

// Create SVG Element
var chart_width     =   800;
var chart_height    =   400;
var svg             =   d3.select( '#chart' )
    .append( 'svg' )
    .attr( 'width', chart_width )
    .attr( 'height', chart_height );

// Create Scales
var x_scale         =   d3.scaleBand()
    .domain( d3.range( data.length ) )
    .rangeRound([ 0, chart_width ])
    .paddingInner( 0.05 );
var y_scale         =   d3.scaleLinear()
    .domain([
        0, d3.max( data )
    ])
    .range([ 0, chart_height ]);


//---------------------------------------------------------------------------------------
//Tool Tips
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html((d)=>{
        var text = "<strong>Value:</strong> <span style='color:red'>" + d + "</span><br>";
        text += "<strong>2 * Value:</strong> <span style='color:red; text-transform:capitalize'>" + 2*d + "</span><br>";
        return text;
    });
svg.call(tip);
//---------------------------------------------------------------------------------------

// Bind Data and create bars
svg.selectAll( 'rect' )
    .data( data )
    .enter()
    .append( 'rect' )
    .attr( 'x', function( d, i ){
        return x_scale(i);
    })
    .attr( 'y', function(d ){
        return chart_height - y_scale( d );
    })
    .attr( 'width', x_scale.bandwidth() )
    .attr( 'height', function( d ){
        return y_scale( d );
    })
    .attr( 'fill', '#7ED26D' )
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

