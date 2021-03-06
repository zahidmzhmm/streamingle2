import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./component/Login";
import Chats from "./component/Chats";
import Messages from "./component/Messages";
import {redirectURI} from "./config";
import AuthLogin from "./component/AuthLogin";

const App = () => {
    const userData = localStorage.getItem('userData');
    return (
        userData != null ?
            <Router>
                <Route exact path="/users/:authKey/chat/:userId">
                    <AuthLogin/>
                </Route>
                <Route exact path="/users/:authKey">
                    <Login/>
                </Route>
                <Route exact path="/chats/:chatId">
                    <Messages userData={userData}/>
                </Route>
                <Route exact path="/chats">
                    <Chats userData={userData}/>
                </Route>
                <Route exact path="/">
                    <Chats userData={userData}/>
                </Route>
            </Router>
            :
            <Router>
                <Route exact path="/" component={window.location.href = redirectURI}/>
                <Route exact path="/users/:authKey">
                    <Login/>
                </Route>
                <Route exact path="/users/:authKey/chat/:userId">
                    <AuthLogin/>
                </Route>
            </Router>
    )
}

export default App


