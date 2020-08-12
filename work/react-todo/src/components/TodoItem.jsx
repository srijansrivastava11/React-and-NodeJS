import React, { useState } from 'react';
import messages from '../messages';
import {fetchDeleteTask, fetchEditTask} from '../services';

const TodoItem = ({item,inputTask,user}) =>  {
  const [error, setError] = useState('');
  const [title, setTitle] = useState(item.title);
  const [edit, setEdit] = useState(false);

  const DeleteItem= () => {
    setError('');
    fetchDeleteTask(user.username,item.taskId)
    .then( (res) => {
       inputTask();
    })
    .catch( (err) => {
       setError(messages[err.code || 'DEFAULT']);
    });
  };

  const EditTask = update => {
    const task = {
      ...item,
      ...update,
      title
    }
    setEdit(false);
    fetchEditTask(user.username, task)
    .then( () => {
      inputTask();
    })
    .catch( (err) => {
      setError(messages[err.code || 'DEFAULT']);
    });
  };

  const onTodoClick =() => {
    EditTask({checked: !item.checked})
  }

  const renderTitle =() => {
    if(edit){
      return <input value={title} onChange= { (e) => setTitle(e.target.value)}/>
    }
    return <span className="task-title">{title}</span>
  }

  const renderButton =() => {
    if(!edit){
      return  <button className="update-button btn"  onClick={()=> setEdit(true)} >Edit</button>
    }
    return <button className="update-button btn"  onClick={()=> EditTask()}>Save</button>
  }

  return(
    <li>
        <div className="todo-display">
        <input type="checkbox"
               checked={!!item.checked}
               onChange={() => onTodoClick(item)} />
          {renderTitle()}
            <button className="delete btn"  onClick={DeleteItem}>Delete</button>
           {renderButton()}
        </div>
    </li>
  );
}

export default TodoItem;
