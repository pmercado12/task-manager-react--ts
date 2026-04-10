import type { Task } from "../../types/Task.js";
import TaskCard from "./../TaskCard/TaskCard.js";

type Props = {
  items: Task[];
  onCambiarEstadoTask: (task: Task) => void;
  onEliminarTarea: (task: Task) => void;
};

function TaskList(props: Props){    

    const onCambiarEstadoTask = (task: Task) =>{
        props.onCambiarEstadoTask(task);
    }

    const onEliminarTarea = (task: Task) =>{
        props.onEliminarTarea(task);
    }

    return (
        <ul>
        {
            props.items.map((task,index) =>{
                //console.log(task);
                return <TaskCard 
                key={index} 
                task={task}
                onCambiarEstadoTask={() => onCambiarEstadoTask(task)}
                onEliminarTarea={() => onEliminarTarea(task)}
                ></TaskCard>
            })
        }
    </ul>
    );
}
export default TaskList;