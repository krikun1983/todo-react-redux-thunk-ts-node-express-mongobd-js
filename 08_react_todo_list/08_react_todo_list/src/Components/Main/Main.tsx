import React from 'react';
import useTypeSelector from 'ReduxStore/hooks/useTypeSelector';
import CategoryList from './CategoryList/CategoryList';
import style from './Main.module.scss';
import TaskList, {TaskType} from './TaskList/TaskList';

const Main: React.FC = () => {
  const {dataTaskState} = useTypeSelector(state => state.dataTaskState);
  const [tasks, setTasks] = React.useState<TaskType[]>([]);

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
