<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
include "../../sys/config/db.inc.php";
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
            $data = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw,balance FROM users WHERE `login`='$username'and`passw`='$passw_hash' limit 1");
            if ($data == true) {
                $core::response("Success", 200, "success", $data);
            } else {
                $core::response("Username or Password wrong");
            }
        } elseif ($request['page'] === 'chats') {
            $user_id = $core->request("user_id");
            $chats = $core->view_all("select * FROM chats WHERE `fromUserId`='$user_id' or `toUserId`='$user_id' order by id desc");
            if (count($chats) > 0) {
                foreach ($chats as $item => $data) {
                    $toUserId = 1;
                    if ($user_id == $data['toUserId']) {
                        $toUserId = $data['fromUserId'];
                    } elseif ($user_id == $data['fromUserId']) {
                        $toUserId = $data['toUserId'];
                    }
                    $udata = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw,login,balance FROM users WHERE id='$toUserId' limit 1");
                    $array[$item]['id'] = $data['id'];
                    $array[$item]['toUserId'] = $toUserId;
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
            $data = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw,balance FROM users WHERE `passw`='$key' limit 1");
            if ($data == true) {
                $core::response("Success", 200, "success", $data);
            } else {
                $core::response("Username or Password wrong");
            }
        } elseif ($request['page'] === 'createChat') {
            $authKey = $core->request("authKey");
            $toUserId = $core->request("userId");
            $currentTime = time();
            $data = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw,balance FROM users WHERE `passw`='$authKey' limit 1");
            if ($data == true) {
                $fromUserId = $data['id'];

                $chats = $core->view("select * FROM chats WHERE `fromUserId`='$fromUserId' and `toUserId`='$toUserId' order by id desc");
                if ($chats == true) {
                    $core::response("Success", 200, "success", ['auth' => $authKey, 'uData' => $data, 'chatLast' => $chats]);
                } else {
                    $query = $core->query("INSERT INTO chats (fromUserId, toUserId, fromUserId_lastView, createAt, message) value ('$fromUserId', '$toUserId', '$currentTime', '$currentTime','New Chat')");
                    if ($query == true) {
                        $lastData = $core->view("select * FROM chats WHERE `fromUserId`='$fromUserId' and `toUserId`='$toUserId' order by id desc");
                        $core::response("Success", 200, "success", ['auth' => $authKey, 'uData' => $data, 'chatLast' => $lastData]);
                    } else {
                        $core::response("Something went wrong");
                    }
                }
            } else {
                $core::response("Token wrong");
            }
        } elseif ($request['page'] === 'getUser') {
            $user_id = $core->request("user_id");
            $data = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw,balance FROM users WHERE `id`='$user_id' limit 1");
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
                $chats1 = $core->view("select * FROM chats WHERE `id`='$id' limit 1");
                $stickers_data = $core->view_all("SELECT * FROM `stickers_data`");
                if ($chats1 == true) {
                    $fromUserId = $chats1['fromUserId'];
                    $toUserId = $chats1['toUserId'];
                    $user1 = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw,login,balance FROM users WHERE `id`='$fromUserId' limit 1");
                    $user2 = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw,login,balance FROM users WHERE `id`='$toUserId' limit 1");
                    $messages = $core->view_all("select * FROM messages WHERE `chatId`='$id'");
                    $array['chats'] = $chats1;
                    if ($user_id == $user1['id']) {
                        $array['user1'] = $user1;
                        $array['user2'] = $user2;
                    } elseif ($user_id == $user2['id']) {
                        $array['user1'] = $user2;
                        $array['user2'] = $user1;
                    } else {
                        $array['user1'] = $user2;
                        $array['user2'] = $user1;
                    }
                    $array['messages'] = $messages;
                    $array['stickers'] = $stickers_data;
                    $core::response("Success", 200, "success", $array);
                }
                if ($chats1 == false) {
                    $core::response("Data not found");
                }
            }
        } elseif ($request['page'] === 'sendMessage') {
            $balance = $core->request('balance') - 1;
            $chatId = $core->request('chat_id');
            $fromUserId = $core->request('from_user');
            $toUserId = $core->request('to_user');
            $lastView = time();
            $message = $core->real_escape($core->request('message'));
            if (empty($chatId) || empty($fromUserId) || empty($toUserId)) {
                $core::response("Params Missing");
            } else {
                $data = $core->view("select * FROM chats WHERE `id`='$chatId' limit 1");
                $core->query("update chats set fromUserId_lastView='$lastView' WHERE `id`='$chatId' limit 1");
                if ($data !== null) {
                    $imgUrl = empty($_FILES['image']['name']) ? "" : "https://streamingle.com/api/uploads/" . $core->uploads($_FILES['image']);
                    $stickerId = $core->request('stickerId');
                    $stickerImgUrl = $core->request('stickerImgUrl');
                    $createAt = time();
                    $ip_addr = $core::ip_addr();
                    $u_agent = $core::u_agent();
                    $core->query("UPDATE `chats` SET `message`='$message' where id='$chatId'");
                    $insert = $core->query("INSERT INTO messages (chatId,fromUserId, toUserId, message, imgUrl, stickerId, stickerImgUrl, createAt, ip_addr, u_agent) value ('$chatId','$fromUserId', '$toUserId', '$message', '$imgUrl', '$stickerId', '$stickerImgUrl', '$createAt', '$ip_addr', '$u_agent')");
                    if ($insert == true) {
                        $data2 = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw,balance FROM users WHERE `id`='$toUserId' limit 1");
                        $data3 = $core->view("select id, state, fullname, lowPhotoUrl, verify, pro, free_messages_count,passw,balance FROM users WHERE `id`='$fromUserId' limit 1");
                        $core->query("update users set balance='$balance' WHERE `id`='$fromUserId'");
                        $messages = $core->view_all("select * FROM messages WHERE `chatId`='$chatId'");
                        $array['chats'] = $data;
                        $array['user1'] = $data3;
                        $array['user2'] = $data2;
                        $array['messages'] = $messages;
                        $core::response("Success", 200, "success", $array);
                    } else {
                        $core::response("Something Problem");
                    }
                } else {
                    $core::response("Chats not found");
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