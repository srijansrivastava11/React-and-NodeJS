import React, { useState, useEffect } from 'react';
import { fetchGetAvailableUsers, fetchPostAvailableUsers} from '../services'
import ChatPage from './ChatPage'


const Portal = () => {


    const [error, setError] = useState('');
    const [chatPageRender, setChatPageRender] = useState(false);
    const [clientError, setclientError] = useState("");
    const [UserList, setUserList] = useState('');

    const userslist = () => {
        fetchGetAvailableUsers()
            .then((userList) => {
                setclientError("");
                setUserList(userList);
            })
            .catch((err) => {
                setclientError(err.error);
                setUserList('');
            });
    }

    const goToChatPage = () => {
      fetchPostAvailableUsers()
          .then((data) => {
              setChatPageRender(true);
        })

          .catch((err) => {
              setError(err.error);
          });
  }


    useEffect(() => {
        userslist();
        const intervalId = setInterval(() => {
            userslist();
        }, 2000);
        return function cleanup() {
           clearInterval(intervalId);
       };
    }, []);

    const user = Object.values(UserList).map((user) =>

            <p className="avail-user" key={user.name}>{user.name}</p>

    )
    return (
        <div>
      {(chatPageRender ? <ChatPage/> :
                <div>
                    <div className="title">
                        Welcome
                    </div>
                    <div className='container'>
                            <div className="users">
                            <div className="heading">
                              Active Users
                            </div>
                                <ul className="user-list">
                                    {user}
                                </ul>
                                <div className="status">
                                    {clientError}
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="btn-view" type="button" onClick={goToChatPage}>Start Chat</button>
                        </div>
                            <div className="status">
                                {error}
                            </div>

                </div>

                )
            }
        </div>
    )
}

export default Portal;
