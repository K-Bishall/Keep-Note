<?php
    session_start();
    
    
    if(!isset($_SESSION['userid'])) {
        // $_SESSION['url'] = $_SERVER['PHP_SELF']; 
        header("Location: ./login/login.html");
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <!-- Google fonts -->
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons|Material+Icons+Outlined' rel="stylesheet">
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">

    <link rel="stylesheet" href="css/style.css">

    <title>Note</title>
</head>

<body>
    <div id="note" class="container-fluid">
        <br>
        <!-- containter for new note box -->
        <div id="new_note" class="card container-fluid shadow p-0"></div>

        <!-- container for existing notes -->
        <div id="existing_notes" class="container-fluid" data-toggle="" data-target="">
            <?php
                require_once 'php/read.php';
            ?>
        </div>

        <!-- container for note update modal box -->
        <div class="modal fade" data-show="true" id="update_modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content" id="update_note_box"></div>
            </div>
        </div>
    </div>

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

<script src="js/script.js"></script>
</body>
</html>