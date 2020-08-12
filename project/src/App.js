import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './Components/TableContacts/Table/Table';
import Logout from './Components/Logout';
import Login from './Components/Login';
import { fetchLoginStatus } from './services'

function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLoginStatus()
      .then(userInfo => {
        setUserState({
          isLoggedIn: true,
          username: userInfo.userName
        });
      })
      .catch((err) => {
        setError(err.error);
        setUserState({
          isLoggedIn: false
        })
      });
  }, []);

  const onLogin = (userInfo) => {
    setUserState({
     isLoggedIn: true,
     username: userInfo.username
    });
   };

  const onlogout = () => {
    setUserState({
      isLoggedIn: false
    });
  };

  let pageBody;
  if(userState.isLoggedIn) {
    pageBody = <Table user={userState} error={error} />;
  }
  else {
    pageBody = <Login onLogin={onLogin}/>;
  }


  return (
    <div className="backgroundImage">
    <div className="App">
      <Logout user={userState} onLogout={onlogout} />
      {pageBody}
    </div>
    </div>
  );
}

export default App;
