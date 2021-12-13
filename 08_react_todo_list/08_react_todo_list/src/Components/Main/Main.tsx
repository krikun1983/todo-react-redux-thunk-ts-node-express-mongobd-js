import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {delCategoryAction} from 'ReduxStore/categoryAction/categoryAction';
import {DataCategory} from 'ReduxStore/reducers/categoryState';
import {RootState} from 'ReduxStore/types/rootState';
import CategoryList from './CategoryList/CategoryList';
import style from './Main.module.scss';
import TaskList, {TaskType} from './TaskList/TaskList';

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const {dataTaskState} = useSelector(
    (state: RootState) => state.dataTaskState,
  );

  const [tasks, setTasks] = useState<TaskType[]>([]);

  const handleClickCategory = (id: number) => {
    const currentTasks = dataTaskState.filter(task => task.categoryId === id);
    setTasks(currentTasks);
  };

  const handleDelCategory = (currentCategory: DataCategory) => {
    dispatch(delCategoryAction(currentCategory));
  };

  return (
    <main className={style.main}>
      <div className={style.main__categories}>
        <CategoryList
          onClickCategory={handleClickCategory}
          onDelCategory={handleDelCategory}
        />
      </div>
      <div className={style.main__tasks}>
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
};

export default Main;
