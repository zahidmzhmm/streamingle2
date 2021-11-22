import React from 'react';
import {Link, useParams} from 'react-router-dom';
import ChatList from "./functions/ChatList";
import {importAllList, importChatsList} from "../renderData";
import TopBar from "./functions/Topbar";
import Content from "./functions/Content";
import ChatForm from "./functions/ChatForm";
import {redirectURI} from "../config";
import {decryptData} from "../util";

const Messages = ({userData}) => {
        const {chatId} = useParams();
        const [chatIdUpdate, setChatIdUpdate] = React.useState(chatId);
        const [allList, setAllList] = React.useState(null);
        const [chats, setChats] = React.useState(null);
        const [update, setUpdate] = React.useState(true);
        const udata = decryptData(userData)
        React.useEffect(() => {
                if (chatId !== chatIdUpdate) {
                    setChatIdUpdate(chatId)
                    setUpdate(true);
                    setRespon(true);
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
            }, 2000);
            return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        }, []);
        const [respon, setRespon] = React.useState(true);
        if (allList !== null && chatId !== null && chats !== null) {
            return (
                <>
                    <div className="grid md:grid-cols-3 xl:grid-cols-4">
                        <div className={`${respon === true ? 'd-none' : 'd-block'} d-lg-block`}>
                            <aside className="bg-sr-clr border-2 border-ac-clr">
                                <div>
                                    <div className="flex pb-5 pt-5 items-center shadow mx-0">
                                        <Link to="/chats"><img className="w-50 ml-2 h-10 mr-2"
                                                               src="https://streamingle.com/api/uploads/logo.png"
                                                               alt=""/></Link>
                                    </div>
                                    <nav className="bg-sr-clr" style={{width: '100%'}}>
                                        <ul style={{width: '100%'}} id="sideBarMsg">
                                            {chats.data.map((data, index) =>
                                                <ChatList chatMsg={allList.data} setRespon={setRespon}
                                                          uData={udata}
                                                          setUpdate={setUpdate} key={index}
                                                          data={data}/>)}
                                        </ul>
                                    </nav>
                                </div>
                            </aside>
                        </div>
                        <div
                            className={`xl:col-span-3 overflow-hidden md:col-span-2 ${respon === false ? 'd-none' : 'd-block'}`}>
                            <TopBar setres={setRespon} res={respon} chatData={allList.data}/>
                            <Content chatData={allList.data}/>
                            {allList.data.user1.pro == 1
                                ? <ChatForm allList={allList.data} setUpdate={setUpdate}/>
                                :
                                <>
                                    {
                                        allList.data.user1.balance > 0
                                            ? <ChatForm allList={allList.data} setUpdate={setUpdate}/>
                                            :
                                            <>
                                                <div className="text-center bg-light py-2">You have no message please <a
                                                    className="text-danger" href={redirectURI}>buy more message</a></div>
                                            </>
                                    }
                                </>
                            }

                        </div>
                    </div>
                </>
            );
        } else {
            return "Loading..";
        }
    }
;

export default Messages;