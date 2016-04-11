<!DOCTYPE html>
<html>
    <head>
        <title>Ronald Magcalas</title>
        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
        <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://secure-taiga-52851.herokuapp.com/css/style.css" rel="stylesheet">
        <script src="http://secure-taiga-52851.herokuapp.com/js/game.code.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="title"></div>

                <div class="panel panel-primary">
                    <div class="panel-heading">
                        Connect4 Game by Ronald Magcalas
                        <button type="button" id='newgame' class="btn btn-success">
                            New Game
                        </button>
                    </div>
                    <div class="panel-body">
                        <div id="board" class="ui-widget-content">
                        </div>
                        <br />
                        <label id='message'></label>
                        <label id='result'></label>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
