import Header from "./componentes/Header/Header.js";
import TaskInput from "./componentes/TaskInput/TaskInput.js";
import TaskList from "./componentes/TaskList/TaskList.js";
import Footer from "./componentes/Footer/Footer.js";
import { useEffect, useState } from "react";
import type { Task } from "./types/Task.js";

type AppModel = {
  tasks: Task[];
  tasksNumber :number;
  tasksCompletedNumber :number;  
};

export default function App() {
  const [appModel, setApp] = useState<AppModel>({
    tasks: [],
    tasksNumber:0,
    tasksCompletedNumber : 0
  });

  const handleAdicionarTarea = (task: Task) => {
    fetch("http://localhost:3000/tasks",{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(task)
    }).then(response => response.json())
    .then(datax=>{
      console.log("tarea creada en backend", datax);
      setApp((prev) => ({
        ...prev,
        tasksNumber:prev.tasksNumber + 1,
        tasks: [...prev.tasks, datax],
      }));
    }).catch(
      error=>{
        console.error("Error al guardar tarea", error);
      }
    );

    

  };

  const onCambiarEstadoTask = (taskInput: Task) => {
    setApp((prev) => ({
      ...prev,
      tasksCompletedNumber: prev.tasksCompletedNumber + (taskInput.state == 'completed' ? 1 : -1),
      tasks: prev.tasks.map((task) =>
        task.id === taskInput.id ? { ...task, state: taskInput.state } : task,
      ),
    }));
  };

  const onEliminarTarea = (taskInput: Task) => {
    setApp((prev) => ({
      ...prev,      
      tasks: prev.tasks.filter(task=>task.id !== taskInput.id),
      tasksCompletedNumber: prev.tasksCompletedNumber + (taskInput.state == 'completed' ? -1 : 0),
      tasksNumber: prev.tasksNumber - 1
    }));
  };

  useEffect(
    ()=>{
      fetch('http://localhost:3000/tasks').then((response)=>response.json()).then((data)=>{
        
        setApp((prev) => ({
          ...prev,
          ...prev.tasks = data,
          tasksCompletedNumber: data.filter(task=>task.state=='completed').length,
          tasksNumber: data.length
        }));

      }).catch(error=>{
        console.log('Error al obtener tareas', error);
      })
    },[]
  );

  return (
    <div>
      <div class="grid-container">
        <div class="grid-item"></div>
        <div class="grid-item grid-border">
        <Header tasksNumber={appModel.tasksNumber}
        tasksCompleted={appModel.tasksCompletedNumber}
        ></Header>
        <br />
        <TaskInput onAdicionarTarea={handleAdicionarTarea}></TaskInput>
        <TaskList
          items={appModel.tasks}
          onCambiarEstadoTask={onCambiarEstadoTask}
          onEliminarTarea={onEliminarTarea}
        ></TaskList>      
        </div>
        <Footer></Footer>
      </div>    
    </div>
  );
}
