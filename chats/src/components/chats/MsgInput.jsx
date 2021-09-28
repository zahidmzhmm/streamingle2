import React, {Component} from 'react';
import axios from "axios";
import {apiURI, headers} from "../../config";

class MsgInput extends Component {
    chatData = this.props.chatData;
    userData = this.props.userData;
    chatUpdate = this.props.chatUpdate;

    constructor(props) {
        super(props)
    }

    state = {
        open: false,
        messageInput: "",
        chatUpdate: false,
    };
    onSubmitForm = (e) => {
        e.preventDefault();
        this.setState({messageInput: ""})
        fetch(apiURI + 'sendMessage&chatId=' + this.chatData.chats.id + '&fromUserId=' + this.userData.id + '&toUserId=' + this.chatData.user2.id + '&message=' + this.state.messageInput, {headers})
            .then(res => res.json())
            .then(json => console.log(json))
    }

    render() {
        return (
            <>
                <form onSubmit={(e) => this.onSubmitForm(e)}
                      className="pb-2 pt-0 px-5 flex items-center justify-around gap-1 absolute left-0 bottom-0"
                      style={{width: '100%'}}>
                    <input value={this.state.messageInput}
                           onChange={(e) => this.setState({messageInput: e.target.value})}
                           className="border-2 text-sm border-pr-clr px-3 py-2"
                           style={{width: '100%', borderRadius: '32px'}} type="text" required=""
                           placeholder="Message"/>

                    <button
                        className="bg-pr-clr rounded cursor-pointer text-white p-1 md:p-2 flex justify-center items-center"
                        style={{transform: 'rotate(90deg)'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                        </svg>
                    </button>

                    {
                        this.open ?
                            <div onClick={() => this.setState({open: false})}
                                 className="bg-pr-clr rounded  cursor-pointer text-white p-1 md:p-2 flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            :
                            <div onClick={() => this.setState({open: true})}
                                 className="bg-pr-clr rounded  cursor-pointer text-white p-1 md:p-2 flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                    }
                    <div
                        className="bg-pr-clr rounded  cursor-pointer text-white p-1 md:p-2 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                        </svg>
                    </div>

                    <input type="file" name="" id="getfile" className="hidden"/>
                    <label htmlFor="getfile"
                           className="bg-pr-clr rounded p-1 md:p-2  cursor-pointer text-white flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </label>
                </form>
            </>
        )
    };
}

export default MsgInput;