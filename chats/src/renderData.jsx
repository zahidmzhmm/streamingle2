import {apiURI, headers} from "./config";
import {decryptData} from "./util";
import axios from "axios";

export const importChatsList = (setChats, userData, setUpdate) => {
    const udata = decryptData(userData)
    fetch(apiURI + 'chats&user_id=' + udata.id, {headers})
        .then(res => res.json())
        .then(json => {
            setChats(json);
        });
}
export const importAllList = (setAllList, chatId, userData, setUpdate) => {
    const udata = decryptData(userData)
    fetch(apiURI + 'chatsFind&id=' + chatId + '&user=' + udata.id, {headers})
        .then(res => res.json())
        .then(json => {
            setAllList(json)
        });
}
export const sendMessage = (allData, formData, setUpdate) => {
    const user2Id = allData.user2.id;
    const user1Id = allData.user1.id;
    const balance = allData.user1.balance;
    const chatId = allData.chats.id;
    axios({
        headers,
        url: apiURI + 'sendMessage&chat_id=' + chatId + '&from_user=' + user1Id + '&to_user=' + user2Id + '&balance=' + balance,
        method: "POST",
        data: formData
    }).then((response) => {
        setUpdate(true)
    })
}