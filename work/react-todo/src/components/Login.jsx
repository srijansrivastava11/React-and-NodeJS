import React, { useState } from 'react';
import { fetchLogin } from '../services';
import messages from '../messages';


const Login = ({ onLogin }) => {

  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const performLogin = () => {
    if(!username) {
      setError(messages.USERNAME_REQUIRED);
      return;
    }

    setError('');
    setIsLoading(true);

    fetchLogin(username)
    .then( () => {
      onLogin(username);
    })
    .catch( (err) => {
      setError(messages[err.code || 'DEFAULT']);
      setIsLoading(false);
    });
  };

  return (
    <div className="login">
      <p className="error">{error}</p>
      <h1>Login</h1>
      <input className = "user-info" placeholder ="Enter Username"onChange={ (e) => setUsername(e.target.value) }/>
      { isLoading ?
        <span>Loading......</span> :
          <button className = "to-login" onClick={ performLogin }>Login</button>
      }
    </div>
  );
};

export default Login;
