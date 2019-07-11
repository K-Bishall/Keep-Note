<?php
    // include config file
    require_once "config.php";

    if($_SERVER['REQUEST_METHOD'] == "GET") {
        $sql = "SELECT * FROM notes
                ORDER BY last_modified DESC
                LIMIT 10
                ";

        $stmt = $conn -> prepare($sql);
        $stmt -> execute();

        $result = $stmt -> get_result();

        if($result->num_rows > 0) {
            $id = $title = $content = $color = $lastModified = $pinned = '';
            while($row = $result -> fetch_assoc()) {
                $id = $row['id'];
                $title = $row['title'];
                $content = $row['content'];
                $color = $row['color'];
                $lastModified = $row['last_modified'];
                $pinned = $row['pinned'];

                echo '<div class="saved_note card" id ="'.$id.'" style="background-color:'.$color.';"
                    data-lastModified="'.$lastModified.'" data-pinned="'.$pinned.'" data-color="'.$color.'">
                        <div class="note_title card-header py-1">'.$title.'</div>
                        <div class="note_content card-body py-1">'.$content.'</div>
                        <div class="card-footer py-0">
                            <i class="material-icons-outlined delete">delete</i>
                        </div>
                    </div>';
            }
        }

        $conn -> close();
        
    }

?>