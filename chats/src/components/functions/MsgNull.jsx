import React from 'react';

const MsgNull = ({setToggle, access, userData}) => {
    return (
        <>
            <div className="flex items-center flex-col justify-center"
                 style={{width: '100%', height: '100%'}}>
                {access === true
                    ? <>
                        <h1 className="font-lg text-3xl py-3">Access Denied</h1>
                        <h6>You dont have access on this conversation</h6>
                    </>
                    : <>
                        <h1 className="font-lg text-3xl py-3">Select A Conversation</h1>
                        <h6>Try selecting a conversation</h6>
                    </>}
                <div style={{fontSize: "40px"}} onClick={() => setToggle(false)}
                     className="togglebutton cursor-pointer mt-4 text-purple-500">
                    <i className="fa fa-comments"/>
                </div>
            </div>
        </>
    );
};

export default MsgNull;