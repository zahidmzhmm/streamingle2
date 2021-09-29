import React from 'react';
import './private.css';
import Sidebar from "./Sidebar";
import Content from "./Content";
import {decryptData} from "../util";
import {useParams} from 'react-router';

const Private = ({page}) => {
    const [toggle, setToggle] = React.useState(true);
    let localUserData = localStorage.getItem('userData');
    let userData = decryptData(localUserData);
    let {keyId} = useParams();
    return (
        <>{
            <div className="grid lg:grid-cols-3 md:grid-cols-1 relative">
                <div>
                    <Sidebar chatId={keyId} userData={userData} setToggle={setToggle}/>
                </div>
                <div className="h-screen response lg:col-span-2" style={toggle ? {width: '100%'} : {width: '0%'}}>
                    <Content chatId={keyId} userData={userData} page={page} setToggle={setToggle}/>
                </div>
            </div>
        }
        </>
    )
}

export default Private
