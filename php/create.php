<?php
    // include congig file
    require_once "config.php";

    // variables
    $title = $content = "";
    $color = "White";
    $error = "";

    // process new note creation
    if($_SERVER["REQUEST_METHOD"] == "POST") {

        // $rest_json = file_get_contents("php://input");
        // $_POST = json_decode($rest_json, true);

        // validate title
        $input_title = trim(isset($_POST['title']) ? $_POST['title'] : '');
        $input_content = trim(isset($_POST['content']) ? $_POST['content'] : '');
        $input_color = trim(isset($_POST['color']) ? $_POST['color'] : $color);

        // discard if both empty
        if(!empty($input_title) || !empty($input_content)) {
            $title = $input_title;
            $content = $input_content;
            $color = $input_color;
        }
        else {
            $error = "Empty Note ! Discarded !!";
            echo $error;
        }

        // check input errors before inserting into database
        if(empty($error)) {
            // prepare insert statement
            $sql = "INSERT INTO notes (title, content, color)
                    VALUES (?,?,?)";
            
            // prepare and bind variables
            if($stmt = $conn -> prepare($sql)) {
                $stmt -> bind_param("sss",$param_title, $param_content, $param_color);

                // set parameters
                $param_title = $title;
                $param_content = $content;
                $param_color = $color;

                // attempt to execute prepared statement
                if($stmt -> execute()) {
                    echo "Success";
                }
                else {
                    $error = "Something went wrong. Note cannot be saved.";
                    echo $error;
                }

                // close statement
                $stmt -> close();
            }

            // close connection
            $conn -> close();
        }
    }
    exit();
?>