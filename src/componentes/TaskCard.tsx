import { useState } from 'react';
import type { Task } from '../types/Task.js';
import './TaskCard.css';

type Props = {
    task:Task,
    onCambiarEstadoTask: (task: Task) => void;
};

export default function TaskCard(props: Props){   
    
    const onCambiarEstadoTask = (task: Task) => {
        if(task.state == "completed"){
            task.state = "pending";
        }else{
            task.state = "completed";
        }        
        props.onCambiarEstadoTask(task);
    };

    return(
    <li className={props.task.state == "completed" ? "completed" : "pending"}>
        <input type="checkbox"              
             onChange={() => onCambiarEstadoTask(props.task)}
        />
        {props.task.text}
    </li>
    ) 
}