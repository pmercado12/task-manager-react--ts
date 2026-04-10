import type { Task } from "../types/Task.js";
import TaskCard from "./TaskCard.js";

type Props = {
  items: Task[];
  onCambiarEstadoTask: (task: Task) => void;
};

function TaskList(props: Props){    

    const onCambiarEstadoTask = (task: Task) =>{
        props.onCambiarEstadoTask(task);
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
                ></TaskCard>
            })
        }
    </ul>
    );
}
export default TaskList;