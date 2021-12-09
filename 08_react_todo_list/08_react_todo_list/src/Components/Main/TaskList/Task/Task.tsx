import {TaskType} from 'Components/Main/Main';
import React from 'react';
import style from './Task.module.scss';

interface TaskProps {
  title: string;
  description: string;
}

const Task: React.FC<TaskProps> = ({title, description}) => {
  return (
    <>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  );
};

export default Task;
