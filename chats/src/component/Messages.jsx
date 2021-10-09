import React from 'react';
import {useParams} from 'react-router-dom';

const Messages = () => {
    const {chatId} = useParams();
    return (
        <div>
            {chatId}
        </div>
    );
};

export default Messages;