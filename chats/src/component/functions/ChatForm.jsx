import React from 'react';
import {sendMessage} from '../../renderData';
import Picker from 'emoji-picker-react';
import {redirectURI} from "../../config";

const ChatForm = ({allList, setUpdate}) => {
    const [messageInput, setMessageInput] = React.useState("");
    const [chosenEmoji, setChosenEmoji] = React.useState("");
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject.emoji);
        setMessageInput(messageInput + emojiObject.emoji)
        setOpen(false)
    };
    const [open, setOpen] = React.useState(false);
    const [openStickers, setStickers] = React.useState(false);
    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('message', messageInput);
        sendMessage(allList, formData, setUpdate)
        setMessageInput("");
    }
    const fileUploadHandler = (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        sendMessage(allList, formData, setUpdate)
    }
    const submitSticker = (sticker, stickerId) => {
        const formData = new FormData();
        formData.append('stickerId', stickerId);
        formData.append('stickerImgUrl', sticker);
        sendMessage(allList, formData, setUpdate)
        setStickers(false);
    }
    const {stickers} = allList;
    return (
        <>
            <form onSubmit={(e) => formSubmit(e)}
                  className="pb-2 pt-0 px-5 flex items-center justify-around gap-1 relative left-0 bottom-0"
                  style={{width: '100%'}}>
                {
                    open ?
                        <div onClick={() => setOpen(false)}
                             className="bg-pr-clr rounded  cursor-pointer text-white p-1 md:p-2 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </div>
                        :
                        <div onClick={() => setOpen(true)}
                             className="bg-pr-clr rounded  cursor-pointer text-white p-1 md:p-2 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                 fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                }
                <div className={`stickers ${openStickers === true ? "d-block" : "d-none"}`}>
                    {stickers.map((data, index) => (
                        <div key={index}><img onClick={() => submitSticker(data.imgUrl, data.id)} src={data.imgUrl}
                                              alt=""/></div>
                    ))}
                </div>
                <div onClick={() => setStickers(!openStickers)}
                     className="bg-pr-clr rounded  cursor-pointer text-white p-1 md:p-2 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                </div>
                <input value={messageInput}
                       onChange={(e) => setMessageInput(e.target.value)}
                       className="border-2 text-sm border-pr-clr px-3 py-2"
                       style={{width: '100%', borderRadius: '32px'}} type="text" required=""
                       placeholder="Message"/>
                <div className={`emoji_picker ${open === true ? 'd-block' : 'd-none'}`}>
                    <Picker onEmojiClick={onEmojiClick}/>
                </div>

                <button
                    className="bg-pr-clr rounded cursor-pointer text-white p-1 md:p-2 flex justify-center items-center"
                    style={{transform: 'rotate(90deg)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                </button>
                <input type="file" name="" id="getfile" className="hidden" onChange={(e) => fileUploadHandler(e)}/>
                <label htmlFor="getfile"
                       className="bg-pr-clr rounded p-1 md:p-2  cursor-pointer text-white flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                </label>
            </form>
        </>
    );
};

export default ChatForm;