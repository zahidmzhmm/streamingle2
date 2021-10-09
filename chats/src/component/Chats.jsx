import React from 'react';
import {importChatsList} from '../render';
import ChatList from "./functions/ChatList";
import Sidebar from "./functions/Sidebar";
import Topbar from "./functions/Topbar";
import Content from "./functions/Content";
import ChatForm from "./functions/ChatForm";
import {Link} from "react-router-dom";
import Default from "./functions/Default";
import {Container, Row, Col, Button} from "react-bootstrap";
import './chats.css'

const Chats = ({userData}) => {
    const [chats, setChats] = React.useState(null);
    const [update, setUpdate] = React.useState(true);
    React.useEffect(() => {
            if (update === true) {
                importChatsList(setChats, userData, setUpdate);
                setUpdate(false)
            }
        }
    )
    if (chats !== null) {
        return (
            <>
                <div className="grid  md:grid-cols-3 xl:grid-cols-4">
                    <div className="">
                        <aside className="bg-sr-clr border-2 border-ac-clr">
                            <div>
                                <div className="flex pb-5 pt-5 items-center shadow mx-0">
                                    <Link to="/chats"><img className="w-10 h-10 mr-2"
                                                           src="http://chatvia-light.react.themesbrand.com/static/media/logo.e41f6087.svg"
                                                           alt=""/></Link>
                                    <Link to="/" className="font-bold text-2xl">Chats</Link>
                                </div>
                                <nav className="bg-sr-clr" style={{width: '100%'}}>
                                    <ul style={{width: '100%'}} id="sideBarMsg">
                                        {chats.data.map((data, index) => <ChatList key={index} data={data}/>)}
                                    </ul>
                                </nav>
                            </div>
                        </aside>
                    </div>
                    <div className="xl:col-span-3 md:col-span-2">
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