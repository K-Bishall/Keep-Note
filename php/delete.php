<?php
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
    $msg = ""; //msg to return
    // process delete after confirmation
    if(!empty($id)) {
        // include config file
        require_once "config.php";

        // delete statement
        $sql = "DELETE FROM notes WHERE id = ?";

        if($stmt = $conn -> prepare($sql)) {
            // bind variables
            $stmt -> bind_param("i", $param_id);

            // set parameters
            $param_id = trim($id);

            // attempt to execute
            if($stmt -> execute()) {
                $msg = "Note Deleted";
            }
            else {
                $msg = "Something went wrong. Try again later.";
            }

            $stmt -> close();
        }
        $conn -> close();
    }
    else {
        $msg = "Something went wrong. Try again later.";
    }
    // return success or failure msg
    echo $msg;
    exit();
?>