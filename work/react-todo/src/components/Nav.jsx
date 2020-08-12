import React from 'react';
import { fetchLogout } from '../services';

const Nav = ({ user, onLogout }) => {
  const logout = () => {
    fetchLogout()
    .then( () => onLogout() );
  };
  return (
    <div className='nav'>
      { user.isLoggedIn &&
          <button
            className="logout action"
            onClick={logout}
          >Logout</button> }
    </div>
  );
};

export default Nav;
