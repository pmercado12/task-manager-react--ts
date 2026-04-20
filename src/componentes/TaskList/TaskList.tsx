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
        <div className="flex flex-col gap-6">
        {
            props.items.map((task,index) =>{
                return <TaskCard
                key={index}
                task={task}
                onCambiarEstadoTask={() => onCambiarEstadoTask(task)}
                onEliminarTarea={() => onEliminarTarea(task)}
                ></TaskCard>
            })
        }
        </div>
    );
}
export default TaskList;