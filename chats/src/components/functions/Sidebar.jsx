import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import MsgList from "./MsgList";


const Sidebar = ({chats, setToggle, userData}) => {
    return (
        <>
            <aside style={{height: '100vh'}} className="bg-sr-clr border-2 border-ac-clr">
                <div style={{width: '100%!important'}}>
                    <div className="flex pb-5 pt-5 items-center shadow mx-0">
                        <Link to="/chats"><img className="w-10 h-10 mr-2"
                                               src="http://chatvia-light.react.themesbrand.com/static/media/logo.e41f6087.svg"
                                               alt=""/></Link>
                        <Link to="/" className="font-bold text-2xl">Chats</Link>
                    </div>
                    <nav className="bg-sr-clr" style={{width: '100%'}}>
                        <ul style={{width: '100%'}} id="sideBarMsg">
                            {
                                chats.status === 200 && chats.data.map(data => (
                                    <MsgList data={data} setToggle={setToggle} key={data.id}
                                             userData={userData}/>))
                            }

                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}
export default Sidebar;