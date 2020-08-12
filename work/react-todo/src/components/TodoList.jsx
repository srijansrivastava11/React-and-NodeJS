import React,{useState, useEffect} from "react";
import TodoItem from "./TodoItem";
import { fetchGetTask,fetchDeleteTasks, fetchUpdateTheme} from "../services";
import TodoInput from './TodoInput';
import Filter from './Filter';
import Sort from './Sort';
import Theme from './Theme';

const TodoList = ({ user }) => {

  const [todos,setTodos] = useState({});
  const [order, setOrder] = useState(0);
  const [filter, setFilter] = useState(0);
  const [theme,setTheme] = useState('');
  const themeOptions = ['Dark','Light','Colorful'];

  const sortTasks= (taskone, tasktwo) => {
    const firstTask = todos[taskone].title;
    const secondTask = todos[tasktwo].title;

    if(firstTask > secondTask ) {
      return order;
    }
    return -order;
  }

  const filterStatus = key => {
    const todo = todos[key];
    switch(filter) {
      case '-1': return !todo.checked;
      case '1': return !!todo.checked;
      default: return true;
    }
  }

  const inputTask = ()=> {
    fetchGetTask(user.username)
    .then(({data}) =>
      setTodos(data)
    )
  }

  const updateTheme = (theme)=> {
    fetchUpdateTheme(user.username,theme)
    .then(() =>
       setTheme(theme)
    )
  }

  const setClassName = () => {
    if (theme === "Light") {
      return "light";
    } else if (theme === "Colorful") {
      return "colorful";
    } else {
      return "dark";
    }
  };

  const clearList =()=>{
    fetchDeleteTasks(user.username)
    .then(() => setTodos({}))
  }

  useEffect( inputTask, []);
    return (
      <div className={setClassName()}>
        <div className="header">WELCOME</div>
        <div className="second-header">
          { user.username},Just to-do it
        </div>
        <Sort sort={order} setSort={setOrder} />
        <Filter filter={filter} setFilter={setFilter} />
        <Theme  selectTheme={updateTheme} themeChoice={themeOptions}  />
        <TodoInput inputTask={inputTask} user={user} />
        <button className="clear-list" onClick={clearList}>Clear List</button>
        <button className="btn-refresh" onClick={inputTask}>Refresh</button>
        <ul>
          {Object.keys(todos).sort(sortTasks)
                             .filter(filterStatus)
                             .map(key => {
                                const item = todos[key];
                                return <TodoItem key={item.taskId} item={item} inputTask={inputTask} user={user}  />;
          })}
        </ul>
      </div>
    );
  }

export default TodoList;
