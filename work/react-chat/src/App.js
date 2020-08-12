import React, { useState, useEffect } from 'react';
import './App.css';
import Welcome from './Components/Welcome';
import Portal from './Components/Portal';
import Logout from './Components/Logout';

import { fetchLoginStatus } from './services'

function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false });
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLoginStatus()
      .then(userInfo => {
        setUserState({
          isLoggedIn: true
        });
        setUserName(userInfo.userName);
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
    });
    setUserName(userInfo.userName);
  };

  const onlogout = () => {
    setUserState({
      isLoggedIn: false
    });
  };

  let pageBody;
  if(userState.isLoggedIn) {
    pageBody = <Portal userName={userName} error={error} />;
  }
  else {
    pageBody = <Welcome onLogin={onLogin}/>;
  }


  return (
    <div className="App">
      <Logout user={userState} onLogout={onlogout} />
      {pageBody}
    </div>
  );
}

export default App;
