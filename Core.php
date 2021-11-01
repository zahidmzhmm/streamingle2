<?php


class Core
{
    public static function response($message, $status = 401, $type = 'danger', $data = [])
    {
        //http_response_code($status);
        $array = ['message' => $message, 'type' => $type, 'status' => $status, 'data' => $data];
        echo json_encode($array);
        exit;
    }

    public function db()
    {
        $connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($connection == true) {
            return $connection;
        } else {
            die("Database Connection Error");
        }
    }

    public function query($sql)
    {
        return mysqli_query($this->db(), $sql);
    }

    public function real_escape($string)
    {
        return mysqli_real_escape_string($this->db(), $string);
    }

    public function view($sql)
    {
        $query = mysqli_query($this->db(), $sql);
        return mysqli_fetch_array($query, MYSQLI_ASSOC);
    }

    public function request($name)
    {
        $request = $_REQUEST;
        if (isset($request[$name])) {
            return $request[$name];
        } else {
            return false;
        }
    }

    public function view_all($sql)
    {
        $query = mysqli_query($this->db(), $sql);
        return mysqli_fetch_all($query, MYSQLI_ASSOC);
    }

    public static function generateSalt($n = 3)
    {
        $key = '';
        $pattern = '1234567890abcdefghijklmnopqrstuvwxyz.,*_-=+';
        $counter = strlen($pattern) - 1;
        for ($i = 0; $i < $n; $i++) {

            $key .= $pattern[mt_rand(0, $counter)];
        }
        return $key;
    }

    public static function ip_addr()
    {
        if (isset($_SERVER['REMOTE_ADDR'])) $ip_addr = $_SERVER['REMOTE_ADDR'];
        return $ip_addr;
    }

    public static function u_agent()
    {
        if (isset($_SERVER['HTTP_USER_AGENT'])) $u_agent = $_SERVER['HTTP_USER_AGENT'];
        return $u_agent;
    }

    public function uploads($file, $dir = "../uploads/")
    {
        $file_tmp = $file['tmp_name'];
        $file_name = $file['name'];
        $file_exp = explode('.', $file_name);
        $file_ext = strtolower(end($file_exp));
        $filename = substr(sha1(md5(mt_rand(10001, 9999999) . time())), 0, 14) . '.' . $file_ext;
        $destination = $dir . '/' . $filename;
        if (file_exists($destination)) {
            unlink($destination);
        }
        move_uploaded_file($file_tmp, $destination);
        return $filename;
    }
}