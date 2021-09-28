import React from 'react';
import {useParams} from 'react-router';
import {apiURI, headers} from "../config";
import axios from "axios";
import {encryptData} from "./util";

const Login = () => {
    const {authKey} = useParams();
    axios.get(apiURI + 'authLogin&key=' + authKey, {headers})
        .then(function (response) {
            let data = response.data;
            if (data.status === 200) {
                const encryptUser = encryptData(data.data);
                localStorage.setItem('userData', encryptUser);
                window.location.href = '/chats';
            } else {
                console.log("Login Failed")
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    return (<div className="text-gray-dark">Please wait</div>)
};

export default Login;