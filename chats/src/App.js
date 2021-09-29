import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/Login";
import Chats from "./components/Chats";

const App = () => {
    const userData = localStorage.getItem('userData');
    return (
        userData != null ?
            <Router>
                <Route exact path="/users/:authKey">
                    <Login/>
                </Route>
                <Route exact path="/chats">
                    <Chats/>
                </Route>
                <Route exact path="/chats/:chatId"
                       render={(props) => <Chats chatId={props} {...props} />}/>
                <Route exact path="/">
                    <Chats/>
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


