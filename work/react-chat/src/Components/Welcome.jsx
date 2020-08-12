import React, { useState } from 'react';
import Login from './Login'

const Welcome = ({ onLogin }) => {
    const [isStarted, setStarted] = useState(false);

    const CallLogin = () => {
        setStarted(true)
    }


    const calSetSatart = () => {
        setStarted(false);
    }

    return (
        <div>
            {isStarted ?
                <div>
                    <button className="btn-home" type="button" onClick={calSetSatart}>Home</button>
                    <Login onLogin={onLogin} />
                </div>
                :
                <div className='container'>
                    <div className="title">
                        Chat App
                    </div>
                    <div className="sub-title">
                        Get Started
                    </div>
                    <div className='btn-starters'>
                        <button className="btn-start" type="button" onClick={CallLogin}>Chat</button>
                        <div className="divider" />
                    </div>
                </div>
            }

        </div>

    );
};

export default Welcome;
