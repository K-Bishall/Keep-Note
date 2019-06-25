<?php
    define('DB_SERVER','localhost');
    define('DB_USERNAME', 'Bishal');
    define('DB_PASSWORD', '');
    define('DB_NAME', 'personal_app');
    
    // attempt to connect to MYSQL database
    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

    // check connection
    if($conn === false) {
        die("ERROR: Could not connect.".$conn -> connect_error);
    }

?>