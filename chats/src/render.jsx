import {apiURI, headers} from "./config";
import {decryptData} from "./util";

export const importChatsList = (setChats, userData, setUpdate) => {
    const udata = decryptData(userData)
    fetch(apiURI + 'chats&user_id=' + udata.id, {headers})
        .then(res => res.json())
        .then(json => {
            setChats(json);
        });
}