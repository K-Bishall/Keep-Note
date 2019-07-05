<?php
    // include config file
    require_once "config.php";

    if($_SERVER['REQUEST_METHOD'] == "GET") {
        $sql = "SELECT * FROM notes
                ORDER BY id DESC
                LIMIT 10
                ";

        $stmt = $conn -> prepare($sql);
        $stmt -> execute();

        $result = $stmt -> get_result();

        echo json_encode($result -> fetch_assoc(), JSON_FORCE_OBJECT);
        echo mysqli_num_rows($result);

        $conn -> close();
        
    }
    exit();

?>