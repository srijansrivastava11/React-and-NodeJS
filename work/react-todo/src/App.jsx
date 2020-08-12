
import React, { useState, useEffect } from 'react';
import { fetchLoginStatus } from './services';
import TodoList from './components/TodoList';
import Nav from './components/Nav';
import Login from './components/Login';
import './App.css';


const App = () => {
  const [userState, setUserState] = useState({ isLoggedIn: false});

  useEffect( () => {
    fetchLoginStatus()
    .then( userInfo => {

      setUserState({
        isLoggedIn: true,
        username: userInfo.data["username"],
      });
    })
  }, []);

  const login = (username) => {
    setUserState({
      isLoggedIn: true,
      username
    }
    );
  };

  const logout = () => {
    setUserState({
      isLoggedIn: false
    });
  };

  let pageBody;

  if(userState.isLoggedIn) {

    pageBody = ( <div className="display-panel">
                    <TodoList user={userState} key="TodoList"/>
                </div>)
  } else {
    pageBody = <Login onLogin={ login }/>;
  }

  return (
    <div className="app">
        {pageBody}
        <Nav user={userState} onLogout={logout}/>
    </div>
  );
};


export default App;
