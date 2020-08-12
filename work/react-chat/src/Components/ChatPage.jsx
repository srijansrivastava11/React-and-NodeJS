import React, { useState, useEffect } from 'react';
import { fetchChats } from '../services'
import ChatMessages from './ChatMessages'
import MessageSend from './MessageSend'
import { fetchSendMessage } from '../services'


const ChatPage = () => {
  const [messagelist, setMessageList] = useState([]);
  const [error, setError] = useState('');

  const GetchatList = ({ setMessageList, setError }) => {
    fetchChats()
      .then(messages => {
        setMessageList(messages);
      })
      .catch(err => {
        setError(err.error);
      });
  };

  const getMessage = (newMessage) => {
    fetchSendMessage(newMessage)
      .then(() => {
      })
      .catch((err) => {
        setError(err.error);
      });
  }

  useEffect(() => {

    GetchatList({ setMessageList, setError });
    const intervalId = setInterval(() => {
      GetchatList({ setMessageList, setError });
    }, 2000);
    return function cleanup() {
           clearInterval(intervalId);
       };
  }, []);


  return (
    <div id="chat-app">
      <div className="title">
        Chat Application
      </div>
      <div className='container'>

        {<MessageSend getMessage={getMessage} GetchatList={GetchatList} setMessageList={setMessageList} error={error} setError={setError} />}

        <div className="chat-panel">
          {<ChatMessages messagelist={messagelist} />}
        </div>

      </div>
    </div>
  )
}

export default ChatPage;
