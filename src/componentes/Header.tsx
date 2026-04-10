type Props = {
  tasksNumber: number;
};

export default function Header(props: Props) {
  return (
  <div>
    <h1>Task Manager Pedro</h1>
    <br />
    N&uacute;mero de tareas: {props.tasksNumber}
  </div> );
}
