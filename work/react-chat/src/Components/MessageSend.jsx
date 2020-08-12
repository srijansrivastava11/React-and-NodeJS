import React, { useState } from 'react'

function MessageSend({ getMessage, GetchatList, setMessageList, error, setError }) {

    const [newMessage, setNewMessage] = useState('');

    const onInput = (event) => {
        setNewMessage(event.target.value);
    }

    const sendMessage = () => {
        getMessage(newMessage);
        setNewMessage('');
        setError('');
        GetchatList({ setMessageList });
    }

    return (
        <div className="outgoing">
            <input className="message" name="text" type="text" onChange={onInput} value={newMessage} />
            <button className="btn-msg" type="button" onClick={sendMessage}>Send</button>
            <div className="status">
                {error}
            </div>
        </div>
    )
}

export default MessageSend;
