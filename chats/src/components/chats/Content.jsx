import React from 'react';
import MsgController from "./MsgController";

const Content = ({page, setToggle, userData, chatId}) => {
    if (page === 'chats') {
        return (<MsgController chatId={chatId} userData={userData} setToggle={setToggle}/>)
    }
};

export default Content;