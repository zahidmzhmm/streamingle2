<?php
include "Api.php";
include "../../sys/config/db.inc.php";
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
$api = new Api();
$request = $_REQUEST;
if (isset($_SERVER['HTTP_X_API_KEY']) && !empty($_SERVER['HTTP_X_API_KEY'])) {
    if ($_SERVER['HTTP_X_API_KEY'] == API_KEY) {
        $api::response("success", 200, "success", $request);
    } else {
        $api::response("wrong api key", 401);
    }
} else {
    $api::response("api key not found!", 401);
}
