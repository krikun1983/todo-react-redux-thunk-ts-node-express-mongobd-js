import React from 'react';
import style from './Task.module.scss';

interface Props {
  title: string;
  description: string;
}

const Task: React.FC<Props> = ({title, description}) => {
  return (
    <>
      <h3 className={style.task__title}>{title}</h3>
      <p className={style.task__description}>{description}</p>
    </>
  );
};

export default Task;
