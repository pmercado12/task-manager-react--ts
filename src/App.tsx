import Header from "./componentes/Header/Header.js";
import TaskInput from "./componentes/TaskInput/TaskInput.js";
import TaskList from "./componentes/TaskList/TaskList.js";
import Footer from "./componentes/Footer/Footer.js";
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
    <div>
      <div className="grid-container">
        <div className="grid-item"></div>
        <div className="grid-item grid-border">
          <Header tasksNumber={tasksNumber}
            tasksCompleted={tasksCompletedNumber}
          ></Header>
          <br />
          <TaskInput onAdicionarTarea={handleAdicionarTarea}></TaskInput>
          <TaskList
            items={tasks}
            onCambiarEstadoTask={onCambiarEstadoTask}
            onEliminarTarea={onEliminarTarea}
          ></TaskList>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
