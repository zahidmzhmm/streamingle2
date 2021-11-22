import React from 'react';
import {redirectURI} from "../../config";

const Topbar = ({chatData, setres, res}) => {
    const activeUser = chatData.chats.fromUserActive;
    console.log(activeUser + "<br><br>")

    return (
        <>
            <div className="row mb-0 page-titles">
                <div className="px-5 topbarr flex items-center justify-between" style={{width: '100%'}}>
                    <div className="togglebutton cursor-pointer mr-3 text-purple-500">
                        <i onClick={() => setres(!res)} className="fa fa-bars"/>
                    </div>
                    <div className="flex items-center ">
                        <div className="name">
                            <a href={`${redirectURI}/${chatData.user2.login}`} target="_blank"
                               style={{borderRadius: "50%"}}>
                                <img className="w-12 h-12 mr-2"
                                     style={{borderRadius: '50%', objectFit: 'cover'}}
                                     src={chatData.user2.lowPhotoUrl !== "" ? chatData.user2.lowPhotoUrl : "https://streamingle.com/api/uploads/user.jpeg"}
                                     alt=""/>
                            </a>
                            <a href={`${redirectURI}/${chatData.user2.login}`} target="_blank" className="ml-2">
                                <h2 style={{textTransform: "capitalize"}}
                                    className="text-txt-clr font-md mr-2">{chatData !== false && chatData.user2.fullname}</h2>
                            </a>
                            <div className="w-2 h-2 rounded"
                                 style={chatData.active ? {background: '#1dbf73'} : {background: '#1dbf73'}}/>
                        </div>

                    </div>
                    <div className="flex items-center">
                        <a target="_blank" href={`${redirectURI}/${chatData.user2.login}`}
                           className="mr-3 text-purple-500 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Topbar;