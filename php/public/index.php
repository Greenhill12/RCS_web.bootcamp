<?php
require_once ("../src/templates/header.php");
require_once ("../src/utility.php");
echo "<h1>My PHP pages</h1>";
$arr = ["Jānis", "Eva", "Dāvis", "Gvido"];
makeUnorderedList($arr);
require_once ("../src/templates/footer.php");