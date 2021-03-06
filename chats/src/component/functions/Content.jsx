import React, {useEffect, useRef} from 'react';

const Content = ({chatData}) => {
    const messageEl = useRef(false);
    const msgContent = () => {
        messageEl.current.addEventListener('DOMNodeInserted', event => {
            const {currentTarget: target} = event;
            target.scroll({top: target.scrollHeight, behavior: 'smooth'});
        });
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            msgContent()
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <div className="msgContent" ref={messageEl}>
                {chatData.messages.map(data => {
                    const date = data.createAt * 1000;
                    return (
                        <div key={data.id} className="w-100 my-2">
                            <div className={`flex ${data.fromUserId === chatData.user1.id ? 'mainUserMsg' : ''}`}>
                                {/*{data.fromUserId !== chatData.user1.id &&
                                <img src={chatData.user2.lowPhotoUrl !== null && chatData.user2.lowPhotoUrl}
                                     className="w-10 mt-2 h-10 mr-2"
                                     style={{borderRadius: '50%', objectFit: 'cover'}} alt=""/>}*/}
                                <div
                                    className={`px-4 rounded-md py-2 ${data.fromUserId === chatData.user1.id ? 'rightUser' : 'leftUser'}`}>
                                    <h2 className="text-white chat_msg_section">{data.message}</h2>
                                    {data.imgUrl !== "" &&
                                    <img style={{width: '15rem'}} className="mb-3" src={data.imgUrl} alt=""/>}
                                    {data.stickerImgUrl !== "" &&
                                    <img style={{width: '15rem'}} className="mb-3" src={data.stickerImgUrl} alt=""/>}
                                    <p style={{fontSize: '11px'}}
                                       className="text-sm flex self-end text-white">{new Date(date).getHours() + ":" + new Date(date).getMinutes() + " " + new Date(date).toDateString()}</p>
                                </div>
                                {/*{data.fromUserId === chatData.user1.id &&
                                <img src={chatData.user1.lowPhotoUrl} className="w-10 mt-2 h-10 mr-2"
                                     style={{borderRadius: '50%', objectFit: 'cover'}} alt=""/>}*/}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default Content;