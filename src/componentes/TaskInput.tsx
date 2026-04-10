import { useState } from "react";
import type { Task } from "../types/Task.js";
import { v4 as uuidv4 } from 'uuid';

type Props = {
  onAdicionarTarea: (value: Task) => void;
};

export default function TaskInput(props: Props){    
    
    const [task, setTask] = useState<Task>({
        id:uuidv4(),
        text: "",
        state: "pending",
    });

    const onAdicionarTarea = () => {
        if (!task.text.trim()) {
            return;
        }
            
        props.onAdicionarTarea(task);
        setTask({id:uuidv4(),text:"",state:"pending"}); 
    };

    const cambiarTexto = (texto:string) =>{
        setTask({...task,text:texto}); 
    }

    return (
        <div>
        <input
            type="text"
            value={task.text}
            onChange={(e) => cambiarTexto(e.target.value)}
            placeholder="Escribe una tarea..."
        />
        <button onClick={onAdicionarTarea}>Agregar</button>
        </div>
    );
}