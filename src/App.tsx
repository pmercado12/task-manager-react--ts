import Header from "./componentes/Header.js";
import TaskInput from "./componentes/TaskInput.js";
import TaskList from "./componentes/TaskList.js";
import { useState } from "react";
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
    setApp((prev) => ({
      ...prev,
      tasksNumber:prev.tasksNumber + 1,
      tasks: [...prev.tasks, task],
    }));

  };

  const onCambiarEstadoTask = (taskInput: Task) => {
    setApp((prev) => ({
      ...prev,
      tasksCompletedNumber: prev.tasksCompletedNumber + (taskInput.state == 'completed' ? 1 : 0),
      tasks: prev.tasks.map((task) =>
        task.id === taskInput.id ? { ...task, state: taskInput.state } : task,
      ),
    }));
  };

  return (
    <div>
      <Header tasksNumber={appModel.tasksNumber}></Header>
      <TaskInput onAdicionarTarea={handleAdicionarTarea}></TaskInput>
      <TaskList
        items={appModel.tasks}
        onCambiarEstadoTask={onCambiarEstadoTask}
      ></TaskList>
    </div>
  );
}
