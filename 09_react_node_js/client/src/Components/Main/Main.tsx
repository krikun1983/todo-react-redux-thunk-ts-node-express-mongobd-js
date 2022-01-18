import React from 'react';
import CategoryList from './CategoryList';
import TaskList from './TaskList';
import style from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <main className={style.main}>
      <div className={style.main__categories}>
        <CategoryList />
      </div>
      <div className={style.main__tasks}>
        <TaskList />
      </div>
    </main>
  );
};

export default Main;
