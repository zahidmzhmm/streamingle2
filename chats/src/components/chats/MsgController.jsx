import React, {Component} from 'react';
import UserTop from "./UserTop";
import MsgContent from "./MsgContent";
import MsgChoose from "./MsgChoose";
import MsgInput from "./MsgInput";
import {apiURI, headers} from "../../config";


class MsgController extends Component {
    setToggle = this.props.setToggle;
    userData = this.props.userData;
    chatId = this.props.chatId;
    state = {chatData: false, chatDataUpdate: false}

    constructor(props) {
        super(props);
        fetch(apiURI + 'chatsFind&id=' + props.chatId, {headers})
            .then(res => res.json())
            .then(json => this.setState({chatData: json.data}));
    }

    componentWillReceiveProps(props) {
        if (props.chatId !== this.state.chatId || this.state.chatDataUpdate === true) {
            fetch(apiURI + 'chatsFind&id=' + props.chatId, {headers})
                .then(res => res.json())
                .then(json => this.setState({chatData: json.data}));
        }
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
                                    <MsgInput
                                        userData={this.userData}
                                        chatData={this.state.chatData}/>
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