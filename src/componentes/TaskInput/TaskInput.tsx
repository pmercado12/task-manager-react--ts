import { useState } from "react";
import type { Task } from "../../types/Task.js";
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
        <>
            <input
                className="flex-grow bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-500 font-medium py-3 text-base"
                type="text"
                value={task.text}
                onChange={(e) => cambiarTexto(e.target.value)}
                placeholder="Escribe una tarea"
            />
            <button
                className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition-shadow active:scale-95 duration-200"
                onClick={onAdicionarTarea}
            >
                Adicionar Tarea
            </button>
        </>
    );
}