import React from 'react';
import {importChatsList} from '../renderData';
import ChatList from "./functions/ChatList";
import {Link, useHistory} from "react-router-dom";
import Default from "./functions/Default";
import './chats.css';
import {decryptData} from "../util";

const Chats = ({userData}) => {
    const [chats, setChats] = React.useState(null);
    const [update, setUpdate] = React.useState(true);
    const udata = decryptData(userData);
    React.useEffect(() => {
            if (update === true) {
                importChatsList(setChats, userData, setUpdate);
                setUpdate(false)
            }
        }
    )
    const [respon, setRespon] = React.useState(true);
    const history = useHistory();
    if (chats !== null) {
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
                                        {chats.data.map((data, index) =>
                                            <ChatList udata={udata} setRespon={setRespon} key={index} data={data}/>)}
                                    </ul>
                                </nav>
                            </div>
                        </aside>

                    </div>
                    <div className="xl:col-span-3 md:col-span-2 d-lg-block d-none">
                        <Default access={false}/>
                    </div>
                </div>
            </>
        );
    } else {
        return null;
    }
};

export default Chats;