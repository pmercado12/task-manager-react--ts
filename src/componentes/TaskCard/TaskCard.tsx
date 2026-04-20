import { useState } from 'react';
import type { Task } from '../../types/Task.js';

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

    // Formatear la fecha
    const formatDate = (dateString?: string) => {
        if (!dateString) return "Fecha no disponible";

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    return(
        <div className="group bg-white hover:bg-gray-50 p-5 rounded-xl flex items-center justify-between transition-colors duration-200 border border-transparent hover:border-gray-200 cursor-pointer shadow-sm">
            <div className="flex items-center gap-4">
                <button
                    className="w-6 h-6 rounded border-2 border-gray-300 flex items-center justify-center text-transparent hover:border-blue-600 transition-colors"
                    onClick={() => onCambiarEstadoTask(props.task)}
                >
                    <span className="material-symbols-outlined text-[16px] font-bold text-blue-600">
                        {props.task.state === 'completed' ? 'check' : ''}
                    </span>
                </button>
                <div className="flex flex-col">
                    <span className={`text-gray-900 font-semibold text-lg ${props.task.state === 'completed' ? 'line-through text-gray-500' : ''}`}>
                        {props.task.text}
                    </span>
                    <span className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        {formatDate(props.task.fecha_creacion)}
                    </span>
                </div>
            </div>
            <button
                className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-600 transition-all p-2 rounded-full hover:bg-red-50"
                onClick={() => onEliminarTarea(props.task)}
            >
                <span className="material-symbols-outlined">delete</span>
            </button>
        </div>
    )
}