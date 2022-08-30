import { React, useState, version } from 'react';
// import {version} from 'react-dom'
import './App.css';
import TodoItem from './components/TodoItem';

function App() {
  const fetchTasks = () => {
    const allTasks = JSON.parse(localStorage.getItem('allTasks'));
    if (allTasks) {
      return allTasks;
    }
    else {
      return [];
    }
  }
  const [tasks, setTasks] = useState(fetchTasks());
  const [taskName, setTaskName] = useState('');
  const [subTask1, setSubtask1] = useState('');
  const [subTask2, setSubtask2] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(0);

  const handleChange = (event) => {
    if (event.target.name === "taskName") setTaskName(event.target.value);
    if (event.target.name === "subTask1") setSubtask1(event.target.value);
    if (event.target.name === "subTask2") setSubtask2(event.target.value);
    if (event.target.name === "time") setTime(event.target.value);
  }

  const submit = () => {
    if(taskName===''||time === ''){
      setError(1);
      setTimeout(()=>{setError(0)},3000);
      return;
    }
    const newSub = [];
    if(subTask1!=='')newSub.push(subTask1);
    if(subTask2!=='')newSub.push(subTask2);

    let prevList = JSON.parse(localStorage.getItem('allTasks'));
    if (prevList.length) {
      const nxtkey = prevList[prevList.length-1].key;
      const newTask = {
        name: taskName,
        subTasks: newSub,
        time: time,
        key : nxtkey+1
      }
      prevList.push(newTask);
    
    } 
    else {
      prevList = [];
      const newTask = {
        name: taskName,
        subTasks: newSub,
        time: time,
        key: 1
      }
      prevList.push(newTask);
    }
    localStorage.setItem('allTasks', JSON.stringify(prevList));
    setTasks(fetchTasks());
    setSubtask1(''); setSubtask2(''); setTime(''); setTaskName('');
  }

  const delKey = (key) =>{
    let prevList = JSON.parse(localStorage.getItem('allTasks'));
    let newPrevList = prevList.filter((ele)=>{
      return ele.key !== key;
    })
    localStorage.setItem('allTasks', JSON.stringify(newPrevList));
    setTasks(fetchTasks());
  }
  return (
    <div className="App">
    <div className='add-task'>
      <p className='head-text'>Add task</p>
        <div className='input-div'>
          <div >
            {!!error && <p style = {{color: 'red'}}>Field marked with '*' are required</p>}
            <p>Task *</p>
            <input name="taskName" type="text" placeholder='Enter task' value={taskName} onChange={handleChange} ></input>
          </div>
            <p>Subtasks(optional):</p>
          <div>
            <input name="subTask1" type="text" placeholder='Enter subtask 1' value={subTask1} onChange={handleChange} ></input>
          </div>
          <div>
            <input name="subTask2" type="text" placeholder='Enter subtask 2' value={subTask2} onChange={handleChange} ></input>
          </div>
          <p>Completion time *</p>
          <div><input name="time" type="time" value={time} onChange={handleChange} ></input></div>
          <br></br>
          <button className = "button-4" onClick={submit}>Add task</button>
        </div>
      </div>
      <div className='instructions'>
            <p className='head-text'>Instructions</p>
            <p style= {{fontWeight: 'bold', backgroundColor: 'pink'}}>Add task section: </p>
            <p style={{color: 'red'}}>Field marked with * are required.</p>
            
            <p style = {{fontWeight: 'bold', backgroundColor: 'pink' }} >Current tasks section: </p>
            <p style={{color: 'green'}}>Green color of deadline means 'Task under deadline'</p>
            <p style={{color: 'red'}}>Red color of deadline means 'Deadline Exceeded'</p>
            <p style={{color: 'green'}}>Done - Marks task as done & Undo - Marks task as undone</p>
            <p style={{color: 'black'}}>Delete - Deletes the task</p>
      </div>
      
      <div className='current-tasks'>
        <p className='head-text'>Current tasks</p>
        {tasks.map(ele => { console.log(ele); return <TodoItem task={ele} deleteKey = {delKey}/> })}
      </div>

    </div>

  );
}

export default App;
