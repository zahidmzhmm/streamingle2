import React from 'react';
import {useParams} from 'react-router';
import {apiURI, headers} from "../config";
import axios from "axios";
import {encryptData} from "../util";

const AuthLogin = () => {
    const {authKey} = useParams();
    const {userId} = useParams();
    axios.get(apiURI + 'createChat&authKey=' + authKey + "&userId=" + userId, {headers})
        .then(function (response) {
            let data = response.data;
            if (data.status === 200) {
                const encryptUser = encryptData(data.data.uData);
                localStorage.setItem('userData', encryptUser);
                window.location.href = '/chats/' + data.data.chatLast.id;
            } else {
                return data.massage;
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    return (<div className="text-gray-dark">Please wait</div>)
};

export default AuthLogin;