$( document ).ready( function() {
    var player = 0,
        brows = 6,
        bcols = 7,
        win = 4,
        color = "red",
        message = "it's " + color.toUpperCase() + "'s turn",
        value = 0;
        endgame = 0 ;

// used to update player's turn
    function updatePlayer( x ) {
        player = x;
        if (parseInt( x ) === 0){
            color = "red";
        }
        else {
            color = "blue";
        }
    }

// adjust to available empty tile at bottom
    function checkRowAvailability( tile ) {
        var rowsel = tile.closest( "tr" ).attr( "brow" ),
            colsel = tile.attr( "bcol" ),
            tilesel = "tr.mrow-" + rowsel + " div.mcol-" + colsel,
            lastrow = "";

        for (var i = parseInt( rowsel ); i > 0; i--) {
            tilesel = "tr.mrow-" + i + " div.mcol-" + colsel;
            if ( $( tilesel ).hasClass( "clickable" )) {
                lastrow = tilesel;
            }
        }

        return lastrow;
    }

    function checkIfNextIsSameColor( ro, co, xdir, ydir, color, value ) {
        var r = parseInt( ro ) + parseInt( ydir ),
            c = parseInt( co ) + parseInt( xdir ),
            tilesel = "tr.mrow-" + r + " div.mcol-" + c;

        if ( $( ".clickable" ).hasClass( "clickable" ) ) {
            if ($( tilesel ).hasClass("ui-state-highlight-" + color)) {
    // value increases because same color
                value = parseInt( value ) + 1;

                if (value == win) {
                    return parseInt( 1 );
                }
                return checkIfNextIsSameColor( r, c, xdir, ydir, color, value );
            }
            else
            {
                return parseInt( 0 );
            }
        }else{
            return parseInt( 0 );
        }
    }

// Board Template
    function processTile( color, tiletarget ){

        var prow = $( tiletarget ).closest( "tr" ).attr( "brow" ),
            pcol = $( tiletarget ).attr( "bcol" );

        if ((color == "blue") && (player == 1) ){
            if($( tiletarget ).hasClass( "ui-state-highlight-red" )) {
            }
            else {
                $( tiletarget ).addClass( "ui-state-highlight-blue" );
                $( tiletarget ).addClass( "filled" );
                $( tiletarget ).addClass( "temp-blue" );
                $( tiletarget ).removeClass( "clickable" );
                $( tiletarget ).removeClass( "ui-clickable" );
                updatePlayer( 0 );
            }
            checkAll( prow, pcol, "blue" );
        }

        if((color == "red")&&(player === 0)){
            if($( tiletarget ).hasClass( "ui-state-highlight-blue" ))
            {
            }
            else {
                $( tiletarget ).addClass( "ui-state-highlight-red" );
                $( tiletarget ).addClass( "filled" );
                $( tiletarget ).addClass( "temp-red" );
                $( tiletarget ).removeClass( "clickable" );
                $( tiletarget ).removeClass( "ui-clickable" );
                updatePlayer( 1 );
            }
            checkAll( prow, pcol, "red" );
        }
    }

// Check for Adjacent tiles
    function newGame( )
    {        
        initialize();
    }    

// Check for Adjacent tiles
    function checkAll( prow, pcol, color )
    {
        if(
            checkIfNextIsSameColor( prow, pcol, 0, 1, color, 1 ) +
            checkIfNextIsSameColor( prow, pcol, 1, 1, color, 1 ) +
            checkIfNextIsSameColor( prow, pcol, 1, 0, color, 1 ) +
            checkIfNextIsSameColor( prow, pcol, 1, -1, color, 1 ) +
            checkIfNextIsSameColor( prow, pcol, 0, -1, color, 1 ) +
            checkIfNextIsSameColor( prow, pcol, -1, -1, color, 1 ) +
            checkIfNextIsSameColor( prow, pcol, -1, 0, color, 1 ) +
            checkIfNextIsSameColor( prow, pcol, -1, 1, color, 1 ) >= 1
        )
        {
            if ( endgame === 0 ){
                alert( color.toUpperCase() + " Wins!" );
                $( "#result" ).text( color.toUpperCase() + " Wins!" );
                $( ".clickable" ).addClass( "filled" );
                $( ".clickable" ).removeClass( "clickable" );
                endgame = 1;
            }
        }else{
            if ( $( ".clickable" ).hasClass( "clickable" ) ){

            }else{
                if ( endgame === 0 ){
                    $( "#result" ).text( " DRAW!" );
                    $( ".clickable" ).addClass( "filled" );
                    $( ".clickable" ).removeClass( "clickable" );
                    endgame = 1;
                }
            }
            
        }
    }

        
// Board Template
    function createRows( x, y )
    {
        var tds = "",
            trs = "",
            table = "";

        for (i = 1; i <= y; i++) {
            tds += "<td>" +
                "<div bcol = \"" +
                i +
                "\" class = \"" +
                "d-tile clickable ui-widget-header mcol-" +
                i +
                "\">" +
                    "&nbsp;" +
//                    i +
                "</div>" +
            "</td>" + "";
        }

        for (i = x; i > 0; i--) {
            trs +=
            "<tr brow = \"" + i + "\" class = \"mrow-" + i + "\">" +
//                "<th>" +
//                i +
//                "</th>" +
                tds +
            "</tr>" + "";
        }

        table = "<table>" +
            trs +
            "</table>";
        return table;
    }

    function initialize(){
// Board Template: Initialize each tile
        endgame = 0;
        $( "#board" ).html( createRows( brows, bcols ) );
        $( "#message" ).text( message );
        $( "#result" ).text( "" );

        $( ".clickable" ).on( "click", function( ){

            var tiletarget = checkRowAvailability($( this ));
            processTile( color, tiletarget );
            message = "it's " + color.toUpperCase() + "'s turn";
            if( endgame < 1 ){
                $( "#message" ).text( message );
            }else
            {
                $( "#message" ).text( "" );
            }
            
        });

        $( ".clickable" ).on( "mouseover", function(){
            $( this ).removeClass( "temp-red" );
            $( this ).removeClass( "temp-blue" );

            if($( this ).hasClass( "filled" )){
            }
            else {
                $( this ).addClass("temp-" + color);
            }
        });

        $( ".clickable" ).on( "mouseleave", function(){
            $( this ).removeClass( "temp-red" );
            $( this ).removeClass( "temp-blue" );
        });

        $( "#newgame" ).on( "click", function( ){
            newGame( );
        });
        
    }    


initialize();

});