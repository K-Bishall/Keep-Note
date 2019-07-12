<?php
session_start();

if(!empty($_POST)) {
    require_once "config.php";

    if(isset($_POST['username']) && isset($_POST['password'])) {
        $stmt = $conn -> prepare("SELECT * FROM users WHERE username = ?");
        $stmt -> bind_param('s',$_POST['username']);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $user = $result -> fetch_object();

        if($_POST['password'] === $user -> password) {
            $_SESSION['userid'] = $user -> id;
            $_SESSION['fullname'] = $user -> name;
        }

        if(isset($_SESSION['url'])) {
            header("Location: ".$_SESSION['url']);
            unset($_SESSION['url']);
        }
        else{
            header("Location: ./../");
        }
    }
}

$conn -> close();
?>