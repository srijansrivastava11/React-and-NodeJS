import React, { useState } from 'react';
import { fetchLogIn, fetchPostAvailableUsers } from '../services';

const Login = ({ user, onLogin }) => {

  const [loginUser, setLoginUser] = useState('');
  const [error, setError] = useState('');

  const onInput = (event) => {
    const name = event.target.value
    setLoginUser(name);
  }

  const createLogin = () => {
    fetchLogIn(loginUser)
      .then((userInfo) => {
        onLogin(userInfo);
        fetchPostAvailableUsers();
      })
      .catch((err) => {
        setError(err.error);
      });
  }

  return (
    <div className='container'>
      <div className="title">
        "Welcome, Please Login with your details"
      </div>
      <div className="heading">
        Enter Username
      </div>
        <input className="username" name="text" type="text"
          onChange={onInput}
          value={loginUser}
        />

          <button className="create" type="button" onClick={createLogin} >Login</button>
        <div className="status">
          {error}
        </div>
    </div>

  )
}


export default Login;
