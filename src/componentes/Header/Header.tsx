import './Header.css';

type Props = {
  tasksNumber: number;
  tasksCompleted: number;
};

export default function Header(props: Props) {
  return (
  <div class="header">
    <h1>Task Manager Pedro</h1>
    <br />
    <div class="text-right">
      N&uacute;mero de completadas: {props.tasksCompleted} / {props.tasksNumber}
    </div>
  </div> );
}
