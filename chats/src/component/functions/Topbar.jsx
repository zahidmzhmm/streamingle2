import React from 'react';

const Topbar = ({chatData}) => {
    return (
        <>
            <div className="row mb-0 page-titles">
                <div className="px-3 topbarr flex items-center justify-between" style={{width: '100%'}}>
                    <div className="togglebutton cursor-pointer mr-3 text-purple-500">
                        <i className="fa fa-bars"/>
                    </div>
                    <div className="flex items-center ">
                        <div className="name">
                            <img className="w-12 h-12 mr-2"
                                 style={{borderRadius: '50%', objectFit: 'cover'}}
                                 src={chatData !== false && chatData.user2.lowPhotoUrl}
                                 alt=""/>
                            <h2 className="text-txt-clr font-md mr-2">{chatData !== false && chatData.user2.fullname}</h2>
                            {/*<div className="w-2 h-2 rounded"
                                 style={chatData.active ? {background: 'rgb(16,185,160)'} : {background: 'rgb(179, 86, 11)'}}/>*/}
                        </div>

                    </div>
                    <div className="flex items-center">
                        <div className="mr-3 text-purple-500 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Topbar;