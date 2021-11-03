<?php


class Api
{
    public function request()
    {

    }

    public static function response($message, $status = 200, $type = 'danger', $data = [])
    {
        //http_response_code($status);
        $array = ['message' => $message, 'type' => $type, 'status' => $status, 'data' => $data];
        echo json_encode($array);
    }
}