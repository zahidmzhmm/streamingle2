import React from 'react';
import {NavLink} from "react-router-dom";

const MsgList = ({data, userData}) => {
    return (
        <>
            <li className="" style={{width: '100%'}}>
                <NavLink style={{width: '100%'}} exact={true}
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
                            }} src={data.lowPhoto} alt=""/>
                            {/*<div className="w-3 h-3 absolute border-2 border-white"
                                 style={data.read_usr == 1 ? {
                                     background: 'rgb(16,185,160)',
                                     borderRadius: '50%',
                                     top: '1px',
                                     left: '0'
                                 } : {
                                     background: 'rgb(179, 86, 11)',
                                     borderRadius: '50%',
                                     top: '1px',
                                     left: '0'
                                 }}>
                            </div>*/}
                        </div>
                        <div className="flex flex-col">
                            <h6>{data.fullName}</h6>
                            <p className="text-sm mt-1 msg_side_show">
                                {data.message.length > 20 ? data.message.substring(0, 20) + "..." : data.message}</p>
                        </div>
                    </div>
                </NavLink>
            </li>
        </>
    );
};

export default MsgList;