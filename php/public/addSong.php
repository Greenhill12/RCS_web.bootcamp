<?php
//TODO add more checks for REQUEST type songName and artistName validity
if (!isset($_POST['addSongBtn'])) {
    // die("You are not adding a song!");
    header("Location: /tracks.php"); //or can redirect to error page
}

require_once "../config/config.php";

//create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$songName = $_POST['songName']; //might want to check if user has filled this form
$artistName = $_POST['artistName'];

$stmt = $conn->prepare("INSERT INTO tracks (name,artist) VALUES (?,?)");
$stmt->bind_param("ss", $songName, $artistName); //s means string here
$stmt->execute();
header("Location: /tracks.php");
