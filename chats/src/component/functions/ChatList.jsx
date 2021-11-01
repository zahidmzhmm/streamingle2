import React from 'react';
import {NavLink} from "react-router-dom";

const ChatList = ({setRespon, data, setUpdate}) => {
    return (
        <>
            <li className="" style={{width: '100%'}}>
                <NavLink onClick={() => setRespon(true)} style={{width: '100%'}} exact={true}
                         activeClassName="bg-ac-clr text-txt-clr"
                         className="p-3 waves-effect waves-dark"
                         to={"/chats/" + data.id}>
                    <div className="flex py-3" style={{width: '100%'}}>
                        <div className="mr-3 relative">
                            <img style={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'cover',
                                borderRadius: '50%'
                            }}
                                 src={data.lowPhoto !== "" ? data.lowPhoto : "https://streamingle.com/api/uploads/user.jpeg"}
                                 alt=""/>
                            <div className="w-3 h-3 absolute border-2 border-white"
                                 style={data.read_usr === 1 ? {
                                     background: '#1dbf73',
                                     borderRadius: '50%',
                                     top: '1px',
                                     left: '0'
                                 } : {
                                     background: '#1dbf73',
                                     borderRadius: '50%',
                                     top: '1px',
                                     left: '0'
                                 }}>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h6 style={{textTransform: "capitalize"}}>{data.fullName}</h6>
                            <div className="d-flex">
                                <p className="mt-1 msg_side_show">
                                    {data.message.length > 20 ? data.message.substring(0, 20) + "..." : data.message}
                                    {data.imgUrl !== "" && data.message === "" ? "Image" : ""}
                                </p>
                                {/*<span className="activeCountMsg">10</span>*/}
                            </div>
                        </div>
                    </div>
                </NavLink>
            </li>
        </>
    );
};

export default ChatList;