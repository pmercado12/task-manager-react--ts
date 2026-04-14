import { useState } from 'react';
import type { Task } from '../../types/Task.js';
import './TaskCard.css';

type Props = {
    task:Task,
    onCambiarEstadoTask: (task: Task) => void;
    onEliminarTarea: (task: Task) => void;
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

     const onEliminarTarea = (task: Task) => {
        if(confirm("¿Estás seguro de que deseas eliminar esta tarea?")){
            props.onEliminarTarea(task);
        }        
    };

    return(
    <li className={props.task.state == "completed" ? "completed" : "pending"}>
        <input type="checkbox"              
             onChange={() => onCambiarEstadoTask(props.task)}
             checked={ props.task.state == 'completed'}
        />
        <button class="btn-danger" onClick={() => onEliminarTarea(props.task)}>Eliminar</button>
        {props.task.text}
    </li>
    ) 
}