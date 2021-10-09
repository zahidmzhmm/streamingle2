import React from 'react';

const Content = ({chatData}) => {
    return (
        <>
            <div className="msgContent">
                <div key={1} className="w-100 my-2">
                    <div className={`flex mainUserMsg`}>

                        <img src="/assets/images/users/1.jpg"
                             className="w-10 mt-2 h-10 mr-2"
                             style={{borderRadius: '50%', objectFit: 'cover'}} alt=""/>}
                        <div className="px-4 bg-pr-clr rounded-md py-2">
                            <h2 className="text-white chat_msg_section">Test</h2>
                            <p style={{fontSize: '11px'}}
                               className="text-sm flex self-end text-white">{new Date(160000).getHours() + ":" + new Date(160000).getMinutes() + " " + new Date(160000).toDateString()}</p>
                        </div>
                        <img src="/assets/images/users/1.jpg" className="w-10 mt-2 h-10 mr-2"
                             style={{borderRadius: '50%', objectFit: 'cover'}} alt=""/>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Content;