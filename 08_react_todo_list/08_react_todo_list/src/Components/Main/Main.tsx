import React from 'react';
import {useDispatch} from 'react-redux';
import {delCategoryAction} from 'ReduxStore/actions/categoryAction';
import {DataCategory} from 'ReduxStore/reducers/categoryState';
import {showTaskAction} from 'ReduxStore/reducers/taskState';
import CategoryList from './CategoryList/CategoryList';
import style from './Main.module.scss';
import TaskList from './TaskList/TaskList';

const Main: React.FC = () => {
  const dispatch = useDispatch();

  const handleClickCategory = (id: number) => {
    dispatch(showTaskAction(id));
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
        <TaskList />
      </div>
    </main>
  );
};

export default Main;
