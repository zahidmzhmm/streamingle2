import React, {Component} from 'react';
import UserTop from "./UserTop";
import MsgContent from "./MsgContent";
import MsgChoose from "./MsgChoose";
import {apiURI, headers} from "../../config";


class MsgController extends Component {
    setToggle = this.props.setToggle;
    userData = this.props.userData;
    chatId = this.props.chatId;
    state = {chatData: false, chatDataUpdate: false, messageInput: "", open: false}

    constructor(props) {
        super(props);
        fetch(apiURI + 'chatsFind&id=' + props.chatId, {headers})
            .then(res => res.json())
            .then(json => this.setState({chatData: json.data}));
    }

    componentWillReceiveProps(props) {
        if (props.chatId !== this.state.chatId) {
            fetch(apiURI + 'chatsFind&id=' + props.chatId, {headers})
                .then(res => res.json())
                .then(json => this.setState({chatData: json.data}));
        }
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        fetch(apiURI + 'sendMessage&chatId=' + this.state.chatData.chats.id + '&fromUserId=' + this.props.userData.id + '&toUserId=' + this.state.chatData.user2.id + '&message=' + this.state.messageInput, {headers})
            .then(res => res.json())
            .then(json => json.status === 200 && this.setState({chatDataUpdate: true}))
        this.setState({messageInput: ""})
        fetch(apiURI + 'chatsFind&id=' + this.props.chatId, {headers})
            .then(res => res.json())
            .then(json => this.setState({chatData: json.data}));
    }

    render() {
        return (
            <>
                <div className="container-fluid relative bg-white" style={{height: '100vh'}}>
                    {
                        this.chatId !== undefined && this.state.chatData.chats !== undefined ?
                            this.state.chatData.chats.fromUserId === this.userData.id ?
                                <>
                                    <UserTop userData={this.userData} chatData={this.state.chatData}
                                             setToggle={this.setToggle}/>
                                    <MsgContent userData={this.userData} chatData={this.state.chatData}/>
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                         fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                    </svg>
                                                </div>
                                                :
                                                <div onClick={() => this.setState({open: true})}
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
                                : <MsgChoose access={true} setToggle={this.setToggle} userData={this.userData}/>
                            :
                            <MsgChoose access={false} setToggle={this.setToggle} userData={this.userData}/>
                    }
                </div>
            </>
        )
    };
};

export default MsgController;