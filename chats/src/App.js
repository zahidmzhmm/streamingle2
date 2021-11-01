import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./component/Login";
import Chats from "./component/Chats";
import Messages from "./component/Messages";
import {apiURI, redirectURI} from "./config";

const App = () => {
    const userData = localStorage.getItem('userData');
    return (
        userData != null ?
            <Router>
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
                <Route exact path="/users/:authKey">
                    <Login/>
                </Route>
            </Router>
    )
}

export default App


