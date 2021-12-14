import React from 'react';
import Task from './Task/Task';
import style from './TaskList.module.scss';

export interface TaskType {
  title: string;
  description: string;
  categoryId: number;
  id: number;
}

interface Props {
  tasks: TaskType[];
}

const TaskList: React.FC<Props> = ({tasks}) => {
  return (
    <ul>
      {tasks.map((task: TaskType) => {
        const {id, ...rest} = task;
        return (
          <li key={id} className={style.task}>
            <Task {...rest} />
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
