import TaskInput from "./componentes/TaskInput/TaskInput.js";
import TaskList from "./componentes/TaskList/TaskList.js";
import { useEffect, useState } from "react";
import type { Task } from "./types/Task.js";
import { API_ENDPOINTS } from "./config/api.js";

export default function App() {
  const [tasks, setApp] = useState<Task[]>([]);

  const API_URL = API_ENDPOINTS.TASKS;

  const fetchJSON = async (url: string, options = {}) => {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!res.ok) throw new Error("Error en la petición");

    return res.json();
  };

  const handleAdicionarTarea = async (task: Task) => {
    try {
      const data = await fetchJSON(API_URL, {
        method: "POST",
        body: JSON.stringify(task),
      });
      setApp(prev => ([...prev, data]));
    } catch (error) {
      console.error("Error al guardar tarea", error);
    }
  };

  const onCambiarEstadoTask = async (taskInput: Task) => {
    try {
      const data = await fetchJSON(API_URL + "/" + taskInput.id, {
        method: "PUT",
        body: JSON.stringify(taskInput),
      });
      setApp(prev =>
        prev.map(task =>
          task.id === taskInput.id ? { ...task, state: taskInput.state } : task,
        )
      );
    } catch (error) {
      console.error("Error al guardar tarea", error);
    }
  };

  const onEliminarTarea = async (taskInput: Task) => {
    try {
      const data = await fetchJSON(API_URL + "/" + taskInput.id, {
        method: "DELETE"
      });
      setApp(prev => prev.filter(task => task.id !== taskInput.id)
      );
    } catch (error) {
      console.error("Error al eliminar tarea", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJSON(API_URL, {
          method: "GET"
        });
        setApp(data);
      } catch (error) {
        console.error("Error al obtener tareas", error);
      }
    };

    fetchData();
  }, []);

  const tasksNumber = tasks.length;
  const tasksCompletedNumber = tasks.filter(task => task.state == 'completed').length;

  return (
    <div className="bg-gray-200 text-gray-900 min-h-screen antialiased selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-4xl mx-auto p-6">
        {/* Dashboard Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">Task Manager</h1>
            <p className="text-gray-600 text-lg font-medium">Tienes {tasksNumber - tasksCompletedNumber} tarea(s) pendiente(s)</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4 shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
              {tasksCompletedNumber}/{tasksNumber}
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Progreso</div>
              <div className="text-xs text-gray-600 mt-0.5">Tareas Completadas</div>
            </div>
          </div>
        </div>

        {/* Task Input Area */}
        <div className="bg-gray-50 p-2 rounded-xl flex items-center gap-2 shadow-sm border border-gray-200 mb-10 transition-all focus-within:bg-white focus-within:shadow-md focus-within:border-blue-300">
          <div className="pl-4 text-gray-600">
            <span className="material-symbols-outlined">edit_note</span>
          </div>
          <TaskInput onAdicionarTarea={handleAdicionarTarea} />
        </div>

        {/* Task List */}
        <TaskList
          items={tasks}
          onCambiarEstadoTask={onCambiarEstadoTask}
          onEliminarTarea={onEliminarTarea}
        />
      </div>
    </div>
  );
}
