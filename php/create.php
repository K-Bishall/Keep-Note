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

        // stop XSS
        $input_title = htmlspecialchars($input_title, ENT_QUOTES, 'UTF-8', false);
        $input_content = htmlspecialchars($input_content, ENT_QUOTES, 'UTF-8', false);
        $input_color = htmlspecialchars($input_color, ENT_QUOTES, 'UTF-8', false);

        // discard if both empty
        if(!empty($input_title) || !empty($input_content)) {
            $title = $input_title;
            $content = $input_content;
            $color = $input_color;
        }
        else {
            $error = "Empty Note ! Discarded !!";
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
                    // return newly created object
                    $id = $stmt -> insert_id;
                    $sql = "SELECT * FROM notes WHERE id=".$id;
                    $result = $conn -> query($sql);
                    $result = $result -> fetch_assoc();

                    echo '<div class="saved_note card" id ="'.$id.'" style="background-color:'.$result['color'].';"
                    data-lastModified="'.$result['last_modified'].'" data-pinned="'.$result['pinned'].'" data-color="'.$result['color'].'">
                        <div class="note_title card-header py-1">'.$result['title'].'</div>
                        <div class="note_content card-body py-1">'.$result['content'].'</div>
                        <div class="card-footer py-0">
                            <i class="material-icons-outlined delete">delete</i>
                        </div>
                    </div>';
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