import React, { useState } from "react";
import {fetchPostTask} from '../services';
import messages from '../messages';

const TodoInput = ({user,inputTask}) =>  {
    const [task, setTask] = useState('');
    const [error, setError] = useState('');

    const AddTask = () => {
        if(!task) {
            setError(messages.ITEM_REQUIRED);
            return;
        }
        setError('');
        if(user.username){
            fetchPostTask(user.username,{title:task})
            .then( (res) => {
                inputTask();
                setTask('');
            })
            .catch( (err) => {
            setError(messages[err.code || 'DEFAULT']);
            });
        }
    };

    return (
        <div className="todo-container">
             <p className="error">{error}</p>
            <input className="todo-input" value={task} placeholder="Enter Task"  onChange= { (e) => setTask(e.target.value)}/>
            <button className="btn-todo-add" onClick={ AddTask }>Add</button>
        </div>
    );
};


export default TodoInput;
