<?php
//
if (!isset($_POST['deleteSongBtn'])) {
    // die("You are not adding a song!");
    header("Location: /tracks.php"); //or can redirect to error page
}

require_once "../config/config.php";

//create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$id = $_POST['deleteSongBtn']; //might want to check if user has filled this form


$stmt = $conn->prepare("DELETE FROM tracks WHERE tracks.id = (?)");
$stmt->bind_param("d", $id); //s means integer here
$stmt->execute();
header("Location: /tracks.php");
