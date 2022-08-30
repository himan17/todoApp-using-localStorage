import React, { useState } from "react";
import './TodoItem.css'
function TodoItem(props){
    const {name, subTasks, time, key} = props.task;
    const [del, setDel] = useState(0);
                <div className="delete" onClick={()=>props.deleteKey(key)}> Delete </div>
    const [blur, setBlur] = useState('note-box')

    var col = 'black';
    const timeArr = time.split(':');
    const date = new Date();
    console.log(timeArr[0], timeArr[1]);
    if(Number(timeArr[0])<date.getHours()){
        col = 'red';
    }
    else if(Number(timeArr[0])===date.getHours() && Number(timeArr[1])<date.getMinutes()){
        col = 'red';
    }

    const blurClass = ()=>{
        setBlur(blur!=='note-box' ? 'note-box' :'note-box blur');
    }

    return(
        <div className="note-box" onMouseEnter={()=>{setDel(1)}} onMouseLeave ={()=>{setDel(0)}} >
            <div className={blur}>
                <div className="task-heading">{name}</div>
                {subTasks.map((ele) => {return <div className="subtask"><input type='checkbox'></input> {ele}</div>})}
                <div className={col}>Completion time  - {time} </div>    
            </div>
            {!!del &&<div>
                <div className="delete" onClick={()=>props.deleteKey(key)}> Delete </div>
                <div className="done" onClick={blurClass}> {blur==='note-box' ? 'Done' : 'Undo'}</div>
                
            </div>}
        </div>
    )
}

export default TodoItem;