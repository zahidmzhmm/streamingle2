<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
define("API_KEY", "admin12123");
define("DB_HOST", "localhost");
define("DB_USER", "root");
define("DB_PASS", "");
define("DB_NAME", "chat.app");
include "Core.php";
$core = new Core();
$request = $_REQUEST;
if (isset($_SERVER['HTTP_X_API_KEY'])) {
    if (isset($request['page']) && $_SERVER['HTTP_X_API_KEY'] === API_KEY) {
        if ($request['page'] === 'login') {
            $username = $core->request('username');
            $password = $core->request('password');
            $u_data = $core->view("select salt from users where login='$username'");
            $passw_hash = md5(md5($password) . $u_data['salt']);
            $data = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw FROM users WHERE `login`='$username'and`passw`='$passw_hash' limit 1");
            if ($data == true) {
                $core::response("Success", 200, "success", $data);
            } else {
                $core::response("Username or Password wrong");
            }
        } elseif ($request['page'] === 'chats') {
            $user_id = $core->request("user_id");
            $chats = $core->view_all("select * from chats where fromUserId='$user_id' order by id desc");
            $chats2 = $core->view_all("select * from chats where toUserId='$user_id' order by id desc");
            if (count($chats) > 0) {
                foreach ($chats as $item => $data) {
                    $toUserId = $data['toUserId'];
                    $udata = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw FROM users WHERE id='$toUserId' limit 1");
                    $array[$item]['id'] = $data['id'];
                    $array[$item]['toUserId'] = $toUserId;
                    $array[$item]['fullName'] = isset($udata['fullname']) ? $udata['fullname'] : '';
                    $array[$item]['lowPhoto'] = isset($udata['lowPhotoUrl']) ? $udata['lowPhotoUrl'] : '';
                    $array[$item]['message'] = $data['message'];
                    $array[$item]['read_usr'] = $data['read_usr'];
                }
                $core::response("Success", 200, 'success', $array);
            }
            if (count($chats2) > 0) {
                foreach ($chats2 as $item => $data) {
                    $fromUserId = $data['fromUserId'];
                    $udata = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw FROM users WHERE id='$fromUserId' limit 1");
                    $array[$item]['id'] = $data['id'];
                    $array[$item]['toUserId'] = $fromUserId;
                    $array[$item]['fullName'] = isset($udata['fullname']) ? $udata['fullname'] : '';
                    $array[$item]['lowPhoto'] = isset($udata['lowPhotoUrl']) ? $udata['lowPhotoUrl'] : '';
                    $array[$item]['message'] = $data['message'];
                    $array[$item]['read_usr'] = $data['read_usr'];
                }
                $core::response("Success", 200, 'success', $array);
            } else {
                $core::response("Message Not Found");
            }
        } elseif ($request['page'] === 'messages') {
            $chatId = $core->request("chat_id");
            $chats = $core->view_all("select * from messages where chatId='$chatId'");
            if ($chats == true) {
                $core::response("Success", 200, "success", $chats);
            } else {
                $core::response("Wrong query");
            }
        } elseif ($request['page'] === 'authLogin') {
            $key = $core->request("key");
            $data = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw FROM users WHERE `passw`='$key' limit 1");
            if ($data == true) {
                $core::response("Success", 200, "success", $data);
            } else {
                $core::response("Username or Password wrong");
            }
        } elseif ($request['page'] === 'getUser') {
            $user_id = $core->request("user_id");
            $data = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw FROM users WHERE `id`='$user_id' limit 1");
            if ($data == true) {
                $core::response("Success", 200, "success", $data);
            } else {
                $core::response("Wrong User ID");
            }
        } elseif ($request['page'] === 'chatsFind') {
            $id = $core->request("id");
            $user_id = $core->request("user");
            if (empty($id) || empty($user_id)) {
                $core::response("Empty Data");
            } else {
                $chats1 = $core->view("select * FROM chats WHERE `id`='$id'and`fromUserId`='$user_id' limit 1");
                $chats2 = $core->view("select * FROM chats WHERE `id`='$id'and`toUserId`='$user_id' limit 1");
                if ($chats1 == true) {
                    $fromUserId = $chats1['fromUserId'];
                    $toUserId = $chats1['toUserId'];
                    $user1 = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw FROM users WHERE `id`='$fromUserId' limit 1");
                    $user2 = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw FROM users WHERE `id`='$toUserId' limit 1");
                    $messages = $core->view_all("select * FROM messages WHERE `chatId`='$id'");
                    $array['chats'] = $chats1;
                    $array['user1'] = $user1;
                    $array['user2'] = $user2;
                    $array['messages'] = $messages;
                    $core::response("Success", 200, "success", $array);
                }
                if ($chats2 == true) {
                    $fromUserId = $chats2['fromUserId'];
                    $toUserId = $chats2['toUserId'];
                    $user1 = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw FROM users WHERE `id`='$toUserId' limit 1");
                    $user2 = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw FROM users WHERE `id`='$fromUserId' limit 1");
                    $messages = $core->view_all("select * FROM messages WHERE `chatId`='$id'");
                    $array['chats'] = $chats2;
                    $array['user1'] = $user1;
                    $array['user2'] = $user2;
                    $array['messages'] = $messages;
                    $core::response("Success", 200, "success", $array);
                }
                if ($chats1 == false && $chats2 == false) {
                    $core::response("Data not found");
                }
            }
        } elseif ($request['page'] === 'sendMessage') {
            $chatId = $core->request('chatId');
            $fromUserId = $core->request('fromUserId');
            $toUserId = $core->request('toUserId');
            $message = $core->request('message');
            if (empty($chatId) || empty($fromUserId) || empty($toUserId) || empty($message)) {
                $core::response("Params Missing");
            } else {
                $data = $core->view("select * FROM chats WHERE `id`='$chatId' limit 1");
                $imgUrl = $core->request('imgUrl');
                $stickerId = $core->request('stickerId');
                $stickerImgUrl = $core->request('stickerImgUrl');
                $createAt = time();
                $ip_addr = $core::ip_addr();
                $u_agent = $core::u_agent();
                $core->query("UPDATE `chats` SET `message`='$message' where id='$chatId'");
                $insert = $core->query("INSERT INTO messages (chatId,fromUserId, toUserId, message, imgUrl, stickerId, stickerImgUrl, createAt, ip_addr, u_agent) value ('$chatId','$fromUserId', '$toUserId', '$message', '$imgUrl', '$stickerId', '$stickerImgUrl', '$createAt', '$ip_addr', '$u_agent')");
                if ($insert == true) {
                    $data2 = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw FROM users WHERE `id`='$toUserId' limit 1");
                    $data3 = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw FROM users WHERE `id`='$fromUserId' limit 1");
                    $messages = $core->view_all("select * FROM messages WHERE `chatId`='$chatId'");
                    $array['chats'] = $data;
                    $array['user1'] = $data3;
                    $array['user2'] = $data2;
                    $array['messages'] = $messages;
                    $core::response("Success", 200, "success", $array);
                } else {
                    $core::response("Something Problem");
                }
            }
        } else {
            $core::response("Email & Password is required");
        }
    } else {
        $core::response("Authentication Error");
    }
} else {
    $core::response("Key not found!");
}
?>