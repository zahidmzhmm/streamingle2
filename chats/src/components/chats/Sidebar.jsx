import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import MsgList from "./MsgList";
import axios from "axios";
import {apiURI, headers} from "../../config";


class Sidebar extends React.Component {
    setToggle = this.props.setToggle;
    userData = this.props.userData;
    state = ({chats: []});

    componentDidMount() {
        fetch(apiURI + 'chats&user_id=' + this.userData.id, {headers})
            .then(res => res.json())
            .then(json => this.setState({chats: json}));
    }

    render() {
        return (
            <>
                <aside style={{height: '100vh'}} className="bg-sr-clr border-2 border-ac-clr">
                    <div style={{width: '100%!important'}}>
                        <div className="flex pb-5 pt-5 items-center shadow mx-0">
                            <Link to="/chats"><img className="w-10 h-10 mr-2"
                                                   src="http://chatvia-light.react.themesbrand.com/static/media/logo.e41f6087.svg"
                                                   alt=""/></Link>
                            <Link to="/" className="font-bold text-2xl">Chats</Link>
                        </div>
                        <nav className="bg-sr-clr" style={{width: '100%'}}>
                            <ul style={{width: '100%'}} id="sideBarMsg">
                                {
                                    this.state.chats.status == 200 && this.state.chats.data.map(data => (
                                        <MsgList data={data} setToggle={this.setToggle} key={data.id}
                                                 userData={this.userData}/>))
                                }

                            </ul>
                        </nav>
                    </div>
                </aside>
            </>
        );
    }
};

export default Sidebar;