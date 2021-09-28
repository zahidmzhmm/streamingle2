import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Private from "./components/chats/Private";
import Login from "./components/Login";


const App = () => {
    const userData = localStorage.getItem('userData');
    return (
        userData == null ?
            <Router>
                <Route exact path="/users/:authKey">
                    <Login/>
                </Route>
            </Router>
            :
            <Router>
                <Route exact path="/users/:authKey">
                    <Login/>
                </Route>
                <Route exact path="/chats">
                    <Private page="chats"/>
                </Route>
                <Route exact path="/">
                    <Private page="chats"/>
                </Route>
                <Route exact path="/chats/:keyId">
                    <Private page="chats"/>
                </Route>
            </Router>
    )
}

export default App


