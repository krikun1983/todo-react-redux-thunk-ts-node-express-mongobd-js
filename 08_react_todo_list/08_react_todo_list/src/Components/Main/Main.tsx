import React, {useState} from 'react';
import useTypeSelector from 'ReduxStore/hooks/useTypeSelector';
import CategoryList from './CategoryList/CategoryList';
import style from './Main.module.scss';
import TaskList from './TaskList/TaskList';

export interface TaskType {
  title: string;
  description: string;
  categoryId: number;
  id: number;
}

const Main: React.FC = () => {
  const {dataTaskState} = useTypeSelector(state => state.dataTaskState);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const handleClickCategory = (id: number) => {
    const currentTasks = dataTaskState.filter(task => task.categoryId === id);
    setTasks(currentTasks);
  };

  return (
    <main className={style.main}>
      <div className={style.main__categories}>
        <CategoryList onClickCategory={handleClickCategory} />
      </div>
      <div className={style.main__tasks}>
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
};

export default Main;
