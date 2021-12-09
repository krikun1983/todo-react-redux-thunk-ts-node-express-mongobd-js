import React from 'react';
import {TaskType} from '../Main';
import Task from './Task/Task';
import style from './TaskList.module.scss';

interface TaskListProps {
  tasks: TaskType[];
}

const TaskList: React.FC<TaskListProps> = ({tasks}) => {
  return (
    <ul>
      {tasks.map((task: TaskType) => {
        const {id, ...rest} = task;
        return (
          <li key={id}>
            <Task {...rest} />
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
