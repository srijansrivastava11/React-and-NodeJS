import React, { useState } from 'react';
import { fetchLogIn } from '../services';

const Login = ({ user, onLogin }) => {

  const [loginUser, setLoginUser] = useState('');
  const [error, setError] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const onInput = (event) => {
    const name = event.target.value
    setLoginUser(name);
  }

  const onPassword = (event) => {
    const password = event.target.value
    setLoginPassword(password);
  }

  const createLogin = () => {
    fetchLogIn(loginUser, loginPassword)
      .then((userInfo) => {
        onLogin(userInfo);
      })
      .catch((err) => {
        setError(err.error);
      });
  }
  const createAdminLogin = () => {
      document.querySelector(".password").style.display = "inline-block";
      document.querySelector(".admin-login").remove();
  }

  return (
    <div className='container'>
      <div className="title">
        Welcome to Contacts Management System, Please Login with your details
      </div>
      <div className="admin-div">
        <button className="create admin-login" type="button" onClick={createAdminLogin} >Admin Login</button>
      </div>
      <div className="heading">
        Enter Username
      </div>
        <input className="username" name="text" type="text"
          onChange={onInput}
          value={loginUser}
          placeholder="Username"
        />
        <br/>
          <input type="password" className="password" name="password" onChange={onPassword} value={loginPassword} placeholder="Password" /><br/>
          <button className="create" type="button" onClick={createLogin} >Login</button>
        <div className="error-msg">
          {error}
        </div>
    </div>

  )
}


export default Login;
