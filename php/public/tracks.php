<?php
require_once "../config/config.php";
echo "Reading my tracks";
echo "<hr>";

include "../src/templates/songFilterForm.html";
include "../src/templates/addNewSongForm.html";

//create connection
$conn = new mysqli($servername, $username, $password, $dbname);

//check connection
if ($conn->connect_error) {
    die("Connection failed: ".$conn->connect_error);
}
echo "Connected successfully";


if (isset($_GET['artistName'])) {
    $aName = "%" . $_GET['artistName'] . "%";
    // prepare and bind
    $stmt = $conn->prepare("SELECT * FROM tracks WHERE artist LIKE (?)");
    $stmt->bind_param("s", $aName); //s means string here
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $sql = "SELECT * FROM tracks";
    $result = $conn->query($sql);
}

echo "<hr>";

if ($result->num_rows > 0) {
    echo "Cool we got " . $result->num_rows . " rows of data <br>";
    
    // output data of each row
    while($row = $result->fetch_assoc()) {
        // var_dump($row);
        // echo "<br>";
        // echo "id: " . $row["id"]. " name: " . $row["name"]. " artist: " . $row["artist"]. " created on " . $row["created"] . "<br>";
        $id = $row["id"];
        $html = "id: " . $id . ",";
        $html .= " name: " . $row["name"] . ",";
        $html .= " artist: " . $row["artist"] . ",";
        $html .= " created on " . $row["created"];
        $html .= "<form action='deleteSong.php' method='post'>";
        $html .= "<button type='submit' name='deleteSongBtn' value='$id'>";
        $html .= "DELETE</button>";
        $html .= "</form>";
        echo $html;
    }
} else {
    echo "0 results";
}

echo "<hr>";

$sql = "SELECT * FROM tracks WHERE artist LIKE 'ABBA'";
$result = $conn->query($sql);

// $allrows = $result->fetch_all(MYSQLI_BOTH);
$allrows = $result->fetch_all(MYSQLI_ASSOC);
var_dump($allrows);

echo "<hr>";

foreach($allrows as $rowindex => $row) {
    echo "<div class='myrow' id='row-$rowindex'>";
        $html = "id: " . $row["id"]. ",";
        $html .= " name: " . $row["name"]. ",";
        $html .= " artist: " . $row["artist"]. ",";
        $html .= " created on " . $row["created"] . "<br>";
        echo $html;
    echo "</div>";


}