import React from 'react';
import {Link, useParams} from 'react-router-dom';
import ChatList from "./functions/ChatList";
import {importAllList, importChatsList} from "../renderData";
import TopBar from "./functions/Topbar";
import Content from "./functions/Content";
import ChatForm from "./functions/ChatForm";

const Messages = ({userData}) => {
        const {chatId} = useParams();
        const [chatIdUpdate, setChatIdUpdate] = React.useState(chatId);
        const [allList, setAllList] = React.useState(null);
        const [chats, setChats] = React.useState(null);
        const [update, setUpdate] = React.useState(true);
        React.useEffect(() => {
                if (chatId !== chatIdUpdate) {
                    setChatIdUpdate(chatId)
                    setUpdate(true)
                }
                if (update === true) {
                    importChatsList(setChats, userData, setUpdate)
                    importAllList(setAllList, chatId, userData, setUpdate)
                    setUpdate(false)
                }
            }
        )
        React.useEffect(() => {
            const interval = setInterval(() => {
                setUpdate(true);
            }, 5000);
            return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        }, [])

        if (allList !== null && chatId !== null && chats !== null) {
            return (
                <>
                    <div className="grid  md:grid-cols-3 xl:grid-cols-4">
                        <div className="">
                            <aside className="bg-sr-clr border-2 border-ac-clr">
                                <div>
                                    <div className="flex pb-5 pt-5 items-center shadow mx-0">
                                        <Link to="/chats"><img className="w-50 ml-2 h-10 mr-2"
                                                               src="https://streamingle.com/api/uploads/logo.png"
                                                               alt=""/></Link>
                                    </div>
                                    <nav className="bg-sr-clr" style={{width: '100%'}}>
                                        <ul style={{width: '100%'}} id="sideBarMsg">
                                            {chats.data.map((data, index) => <ChatList setUpdate={setUpdate} key={index}
                                                                                       data={data}/>)}
                                        </ul>
                                    </nav>
                                </div>
                            </aside>
                        </div>
                        <div className="xl:col-span-3 md:col-span-2">
                            <TopBar chatData={allList.data}/>
                            <Content chatData={allList.data}/>
                            <ChatForm allList={allList.data} setUpdate={setUpdate}/>
                        </div>
                    </div>
                </>
            );
        } else {
            return null
        }
    }
;

export default Messages;